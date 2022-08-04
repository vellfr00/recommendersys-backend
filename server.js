const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const apiRouter= require('./routes/api');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);

app.use('/api', apiRouter);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', function(error) {
    if(error)
        console.log("Database connection error: " + error);

    console.log("Database connected successfully");
});

module.exports = app;