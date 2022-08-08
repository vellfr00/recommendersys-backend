const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movieId: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },

    title: {
        type: String,
        required: true
    },

    genres: {
        type: String,
        required: true
    },

    imdbId: {
        type: String,
        required: true,
        unique: true
    },

    tmdbId: {
        type: String,
        required: true,
        unique: true
    },

    probIndex: {
        type: Number
    }
});

module.exports = mongoose.model("Movie", movieSchema);