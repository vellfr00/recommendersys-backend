const mongoose = require('mongoose');

const configSchema = {
    selectionMovies: {
        type: Number,
        required: true
    },

    orderingMovies: {
        type: Number,
        required: true
    },

    minElicitIterations: {
        type: Number,
        required: true
    }
};

module.exports = mongoose.model("Config", configSchema);