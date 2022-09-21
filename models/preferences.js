const {mongoose} = require("mongoose");

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

        elicitationData: [new mongoose.Schema({
            proposed: {
                type: [movieReference],
                required: true
            },

            choice: {
                type: movieReference,
                required: true
            }
        }, {_id: false})]
    }, {_id: false})],

    orderingPreferences: [new mongoose.Schema({
        timestamp: {
            type: Date,
            default: Date.now
        },

        elicitationData: [new mongoose.Schema({
            proposed: {
                type: [movieReference],
                required: true
            },

            choice: {
                type: [movieReference],
                required: true
            }
        }, {_id: false})]
    }, {_id: false})],

    ratings: [new mongoose.Schema({
        movie: {
            type: movieReference,
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
    }, {_id: false})],

    toRate: [movieReference]
});

userPreferencesSchema.virtual("user", {
    ref: "User",
    localField: "username",
    foreignField: "username",
    justOne: true
});

module.exports = mongoose.model("Preferences", userPreferencesSchema);