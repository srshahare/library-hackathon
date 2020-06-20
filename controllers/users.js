const JWT = require('jsonwebtoken')
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration')

signToken = user => {
    return JWT.sign({
        iss: 'Infinity',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password} = req.value.body;
        
        //check if there is user with same email
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.status(403).json({error: 'Email is already exist'})
        }

        //create new user
        const newUser = new User({ email, password });
        await newUser.save();

        //Generate the token
        const token = signToken(newUser);

        //respond with token
        res.status(200).json({ token })
    },

    singIn: async (req, res, next) => {

        const token = signToken(req.user);
        res.status(200).json({token: token})
    },

    secret: async (req, res, next) => {
        res.json({secret: 'Authenticated user'})
    },
    
    check: async (req, res, next) => {

        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.send(err)
            })
    },
}