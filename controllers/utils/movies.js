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
        if(typeof n === 'string' || n instanceof String)
            n = parseInt(n);

        let proposed = [], mList = await Movies.find({});

        let num = Math.random(), s = 0, lastIndex = mList.length - 1;
        for (let i = 0; i < lastIndex; ++i) {
            s += mList[i].probIndex;

            if(s > num && proposed.length < n)
                proposed.push(mList[i]);

            if(proposed.length === n)
                break;
        }

        //If proposed array is not full yet, fill it with random movies, else return proposed
        return (proposed.length < n) ? proposed.concat(await module.exports.getRandomMovies(n - proposed.length)) : proposed;
    }
};