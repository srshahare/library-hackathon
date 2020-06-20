const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGO_URI || 'mongodb+srv://Infinity:hackathon123@cluster0-irokk.mongodb.net/Library'

mongoose.connect(mongodbUrl,
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