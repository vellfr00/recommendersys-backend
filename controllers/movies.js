const Movies = require('../models/movie');
const moviesUtils = require('./utils/movies');

require('dotenv').config();

module.exports = {
    //GET Handler - get a list of movies to select one from
    getProposedMovies: async (req, res, next) => {
        let movies, n = process.env.MOVIES_SELECTION;

        switch (req.query.policy) {
            case 'random':
                movies = await moviesUtils.getRandomMovies(n);
                break;
            case 'probability':
                movies = await moviesUtils.getRandomProbabilityMovies(n);
                break;
            default:
                res.status(400);
                next("Invalid movies propose policy");
                return;
        }

        res.status(200);
        res.json(movies);
        res.end();
    },

    //GET Handler - get movie by movieId
    getMovie: (req, res, next) => {
        let id = req.params.movieId;

        if(!id) {
            res.status(400);
            next("Invalid request - missing movie id");
            return;
        }

        Movies.findOne({movieId: id})
            .then((document) => {
                if(!document) {
                    res.status(404);
                    next("Cannot retrieve movie: cannot find movie with id " + id);
                    return;
                }

                res.status(200);
                res.json(document);
                res.end();
            }).catch((error) => {
                console.log("Cannot retrieve movie: " + error);

                res.status(500);
                res.json({message: "Cannot retrieve movie: " + error.message});
                res.end();
        });
    },

    //POST Handler - add a new movie, default probIndex
    addMovie: (req, res, next) => {
        const newMovie = new Movies({
            movieId: req.body.movieId,
            title: req.body.title,
            genres: req.body.genres,
            imdbId: req.body.imdbId,
            tmdbId: req.body.tmdbId,
            probIndex: parseInt(process.env.DEFAULT_PROBINDEX)
        });

        newMovie.save()
            .then((document) => {
                console.log("Added new movie");

                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot add new movie: " + error);

                res.status(500);
                res.json({message: error.message});
                res.end();
        });
    },

    //DELETE Handler - delete a movie by movieId
    deleteMovie: (req, res, next) => {
        let id = req.params.movieId;

        if(!id) {
            res.status(400);
            next("Invalid request - missing movie id");
            return;
        }

        Movies.deleteOne({movieId: id})
            .then((document) => {
                console.log("Deleted movie with movieId: " + id);

                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot delete movie: " + error);

                res.status(500);
                res.json({message: "Cannot delete movie: " + error.message});
                res.end();
        });
    }
};