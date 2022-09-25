const mongoose = require('mongoose');

const configSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Config", configSchema);