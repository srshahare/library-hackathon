const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');

const mongodbUrl = process.env.MONGO_URI || 'mongodb+srv://Infinity:hackathon@123@cluster0-irokk.mongodb.net/Library?retryWrites=true&w=majority'
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

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
