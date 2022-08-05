const Movies = require('../../models/movie');

module.exports = {
    //Function to get n random movies
    getRandomMovies: async (n) => {
        if(typeof n === 'string' || n instanceof String)
            n = parseInt(n);

        return (await Movies.aggregate().sample(n));
    }
};