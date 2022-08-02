import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },

    imdbId: {
        type: String,
        required: true
    },

    tmdbId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    genres: {
        type: String,
        required: true
    },

    prob_index: {
        type: Number,
    }
});

export default mongoose.model("Movie", MovieSchema);