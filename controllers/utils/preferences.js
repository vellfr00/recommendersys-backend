const Config = require('../../models/config');

module.exports = {
    /** SELECTION Preference utils **/
    //Check if data for sent for POST Selection preference is valid
    selectionDataIsValid: async (proposed, choice) => {
        let config = await Config.findOne({});

        let result = proposed && choice &&
            proposed.length === choice.length &&
            proposed.length >= config.minElicitIterations;

        if (!result)
            return false;

        //Choice must be present in proposed array
        let included = true;
        proposed.forEach((proposedIds, index) => {
            if (!proposedIds.includes(choice[index]))
                included = false;
        });

        return included;
    },

    //Build selection preference object to insert in database
    buildSelectionPreference: (proposed, ch) => {
        let data = [];

        proposed.forEach((proposedIds, index) => {
            let _p = proposedIds.map(p => ({movieId: p}));

            data[index] = {
                proposed: _p,
                choice: {movieId: ch[index]}
            };
        });

        return {elicitationData: data};
    },

    /** ORDERING Preference utils **/
    //Check if data sent for POST Ordering preference is valid
    orderingDataIsValid: async (proposed, choice) => {
        let config = await Config.findOne({});

        let result = proposed && choice &&
            proposed.length === choice.length &&
            proposed.length >= config.minElicitIterations;

        if (!result)
            return false;

        //Choice's array elements must be the same of proposed array
        let included = true;
        proposed.forEach((proposedIds, index) => {
            let proposedCopy = [...proposedIds], choiceCopy = [...choice[index]];
            if (proposedCopy.sort().join(',') !== choiceCopy.sort().join(','))
                included = false;
        })

        return included;
    },

    //Build ordering preference object to insert in database
    buildOrderingPreference: (proposed, choice) => {
        let data = [];

        proposed.forEach((proposedIds, index) => {
            let _p = proposedIds.map(p => ({movieId: p}));
            let _c = choice[index].map(c => ({movieId: c}));

            data[index] = {
                proposed: _p,
                choice: _c
            };
        });

        return {elicitationData: data};
    }
};