import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true,
        index: true
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

    title: {
        type: String,
        required: true
    },

    genres: {
        type: String,
        required: true
    },

    probIndex: {
        type: Number
    }
});

export default mongoose.model("Movie", MovieSchema);