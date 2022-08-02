const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    elicitationId: {
        type: Number,
        maxlength: 6
    },

    preferences: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);