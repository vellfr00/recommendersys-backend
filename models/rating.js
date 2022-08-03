import mongoose from "mongoose";

const RatingSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

export default mongoose.model("Rating", RatingSchema);