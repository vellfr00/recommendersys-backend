import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    movieId: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
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

module.exports = mongoose.model("Rating", ratingSchema);