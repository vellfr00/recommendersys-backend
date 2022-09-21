const Movies = require('../models/movie');
const Config = require('../models/config');
const moviesUtils = require('./utils/movies');

require('dotenv').config();

module.exports = {
    //GET Handler - get a list of movies to select one from
    getProposedMovies: async (req, res, next) => {
        let movies, n;
        let config = await Config.findOne({});

        switch (req.query.type) {
            case 'selection':
                n = config.selectionMovies;
                break;
            case 'ordering':
                n = config.orderingMovies;
                break;
            default:
                res.status(400);
                next("Invalid movies propose type");
                return;
        }

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
        res.json({minElicitIterations: config.minElicitIterations, movies: movies});
        res.end();
    },

    //GET Handler - get movie by movieId
    getMovie: (req, res, next) => {
        let id = req.params.movieId;

        if(!id) {
            res.status(400);
            next("Invalid request: missing movie id");
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
};