module.exports = {
    /** SELECTION Preference utils **/
    //Check if data for sent for POST Selection preference is valid
    selectionDataIsValid: (proposed, choice) => {
        //Choice must be present in proposed array
        return (
            proposed &&
            choice &&
            proposed.length > 0 &&
            proposed.includes(choice)
        );
    },

    //Build selection preference object to insert in database
    buildSelectionPreference: (proposed, choice) => {
        let p = proposed.map(m => ({movieId: m}));

        return {
            proposed: p,
            choice: {movieId: choice}
        };
    },

    /** ORDERING Preference utils **/
    //Check if data sent for POST Ordering preference is valid
    orderingDataIsValid: (proposed, choice) => {
        //Choice's array elements must be the same of proposed array
        if(proposed && choice && proposed.length > 0 && proposed.length === choice.length) {
            let proposedCopy = [...proposed], choiceCopy = [...choice];
            return proposedCopy.sort().join(',') === choiceCopy.sort().join(',');
        } else {
            return false;
        }
    },

    //Build ordering preference object to insert in database
    buildOrderingPreference: (proposed, choice) => {
        let p = proposed.map(m => ({movieId: m}));
        let c = choice.map(m => ({movieId: m}));

        return {
            proposed: p,
            choice: c
        };
    }
};