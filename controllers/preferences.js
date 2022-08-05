const Preferences = require('../models/preferences');
const preferencesUtils = require('./utils/preferences');

const preferencesController = {
    //POST Handler - Add new selection preference
    addSelectionPreference: (req, res, next) => {
        let username = req.params.username;
        let proposed = req.body.proposed, choice = req.body.choice;

        //If body data is not set or chosen movie is not in proposed array send error response
        if(!proposed || !choice || !proposed.includes(choice)) {
            res.status(400);
            next("Invalid request data");
            return;
        }

        //TODO - aggiornare probIndex

        let newSelectionPreference = preferencesUtils.buildSelectionPreference(proposed, choice);
        Preferences.findOneAndUpdate({username: username}, {$push: {selectionPreferences: newSelectionPreference}})
            .then((document) => {
                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot add preference: " + error);

                res.status(500);
                next("Cannot add preference: " + error.message);
        });
    },

    //POST Handler - Add new ordering preference
    addOrderingPreference: (req, res, next) => {

    }
};

module.exports = preferencesController;