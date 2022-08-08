const mongoose = require('mongoose');
const {mongo, Schema} = require("mongoose");

const movieReference = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true
    }
}, { _id: false });

movieReference.virtual("movie", {
    ref: "Movie",
    localField: "movieId",
    foreignField: "movieId",
    justOne: true
});

const userPreferencesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    selectionPreferences: [new mongoose.Schema({
        timestamp: {
            type: Date,
            default: Date.now
        },

        proposed: {
            type: [movieReference],
            required: true
        },

        choice: {
            type: movieReference,
            required: true
        }
    }, {_id: false})],

    orderingPreferences: [new Schema({
        timestamp: {
            type: Date,
            default: Date.now
        },

        proposed: {
            type: [movieReference],
            required: true
        },

        choice: {
            type: [movieReference],
            required: true
        }
    }, {_id: false})]
});

userPreferencesSchema.virtual("user", {
    ref: "User",
    localField: "username",
    foreignField: "username",
    justOne: true
});

module.exports = mongoose.model("Preferences", userPreferencesSchema);