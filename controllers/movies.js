const Movies = require('../models/movie');
const moviesUtils = require('./utils/movies');

require('dotenv').config();

module.exports = {
    //GET Handler - get a list of movies to select one from
    getMoviesSelection: async (req, res, next) => {
        let movies, n = process.env.MOVIES_SELECTION;

        switch (req.query.policy) {
            case 'random':
                movies = await moviesUtils.getRandomMovies(n);
                break;
            case 'probIndex':
                //TODO
                break;
            default:
                res.status(400);
                next("Invalid movies selection policy");
                return;
        }

        res.status(200);
        res.json({proposed: movies});
        res.end();
    }
};