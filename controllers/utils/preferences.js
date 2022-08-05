module.exports = {
    //Build selection preference object to insert in database
    buildSelectionPreference: (proposed, choice) => {
        let p = proposed.map(m => ({movieId: m}));

        return {
            proposed: p,
            choice: {movieId: choice}
        };
    }
};