const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

//JSON web tokens strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try{
        //find the user specified in token
        const user = await User.findById(payload.sub);

        // if user doesn't exist, handle it
        if(!user) {
            return done(null, false);
        }

        //Otherwise, return it
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        //find the user given then email
        const user = await User.findOne({ email });

        //if not, handle it
        if(!user) {
            return done(null, false);
        }

        //check if the password is correct
        const isMatch = await user.isValidPassword(password);

        //if not, handle if
        if(!isMatch) {
            return done(null, false);
        }

        //otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));