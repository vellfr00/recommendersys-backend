const Movies = require('../../models/movie');

module.exports = {
    //Function to get n random movies
    getRandomMovies: async (n) => {
        if(typeof n === 'string' || n instanceof String)
            n = parseInt(n);

        return (await Movies.aggregate().sample(n));
    },

    //Function to get n random movies that takes into consideration the probability of each movie
    getRandomProbabilityMovies: async (n) => {
        //Get a random movie based on probability
        function getRandomProbabilityMovieIndex(mList) {
            let num = Math.random(), s = 0, lastIndex = mList.length - 1;
            for(let i = 0; i < lastIndex; ++i) {
                s += mList[i].probIndex;
                if (num < s)
                    return i;
            }

            return lastIndex;
        }

        if(typeof n === 'string' || n instanceof String)
            n = parseInt(n);

        let proposed = [], movies = await Movies.find({});
        for(let i = 0; i < n; i++) {
            let index = getRandomProbabilityMovieIndex(movies);
            let movie = movies[index];
            movies.splice(index, 1);
            proposed.push(movie);
        }

        return proposed;
    }
};