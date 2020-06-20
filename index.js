const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const User  = require("./models/user");

const mongodbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/Library'
mongoose.connect(mongodbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(connect => {
        })
        .catch(e => console.log('could not connect to mongodb', e))


const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/users', require('./routes/users'));

app.get('/allusers', (req, res, next) => {
    User.find()
        .then(result => {
            res.json(result)
        })
})

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT);
