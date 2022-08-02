const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

//SERVER START
db.once('open', function(error) {
    if(error) {
        console.log("Database connection error: " + error);
    } else {
        console.log("Database connected, starting server...");

        app.listen(process.env.PORT, function(err) {
            if(err) {
                console.log("Cannot start server: " + err);
            } else {
                console.log("Server started successfully on port " + process.env.PORT);
            }
        });
    }
});