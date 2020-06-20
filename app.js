const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Infinity:hackathon123@cluster0-irokk.mongodb.net/Library?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true})

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})