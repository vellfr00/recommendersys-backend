const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    movieId: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

ratingSchema.virtual("user", {
    ref: "User",
    localField: "username",
    foreignField: "username",
    justOne: true
});

ratingSchema.virtual("movie", {
    ref: "Movie",
    localField: "movieId",
    foreignField: "movieId",
    justOne: true
});

module.exports = mongoose.model("Rating", ratingSchema);