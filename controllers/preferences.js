const Preferences = require('../models/preferences');
const preferencesUtils = require('./utils/preferences');

const preferencesController = {
    //POST Handler - Add new selection preference
    addPreference: async (req, res, next) => {
        let username = req.params.username;
        let proposed = req.body.proposed, choice = req.body.choice;

        switch (req.query.type) {
            case 'selection':
                if (!(await preferencesUtils.selectionDataIsValid(proposed, choice))) {
                    res.status(400);
                    next("Invalid request data: data not coherent or not enough elicitation iterations");
                    return;
                }

                let newSelectionPreference = preferencesUtils.buildSelectionPreference(proposed, choice);
                let toRatePush = choice.map(c => ({movieId: c}));

                Preferences.findOneAndUpdate({username: username},
                    {$push: {selectionPreferences: newSelectionPreference, toRate: toRatePush}})
                    .then((document) => {
                        res.status(200);
                        res.end();
                    }).catch((error) => {
                    console.log("Cannot add preference: " + error);

                    res.status(500);
                    next("Cannot add preference: " + error.message);
                });

                break;
            case 'ordering':
                if (!(await preferencesUtils.orderingDataIsValid(proposed, choice))) {
                    res.status(400);
                    next("Invalid request data: data not coherent or not enough elicitation iterations");
                    return;
                }

                let newOrderingPreferences = preferencesUtils.buildOrderingPreference(proposed, choice);
                Preferences.findOneAndUpdate({username: username},
                    {$push: {orderingPreferences: newOrderingPreferences}})
                    .then((document) => {
                        res.status(200);
                        res.end();
                    }).catch((error) => {
                    console.log("Cannot add preference: " + error);

                    res.status(500);
                    next("Cannot add preference: " + error.message);
                });

                break;
            default:
                res.status(400);
                next("Invalid preference type");
                return;
        }
    },

    //GET Handler - Get a type of preferences of a user by username
    getPreferences: (req, res, next) => {
        let username = req.params.username;

        switch(req.query.type) {
            case 'selection':
                Preferences.findOne({username: username}, {_id: 0, selectionPreferences: 1})
                    .then((document) => {
                        if(!document) {
                            res.status(404);
                            next("Cannot get preferences: cannot find user " + username);
                            return;
                        }

                        res.status(200);
                        res.json(document.selectionPreferences);
                        res.end();
                    }).catch((error) => {
                        console.log("Cannot get preferences: " + error);

                        res.status(500);
                        res.json({message: "Cannot get preferences: " + error.message});
                        res.end();
                });

                break;
            case 'ordering':
                Preferences.findOne({username: username}, {_id: 0, orderingPreferences: 1})
                    .then((document) => {
                        if(!document) {
                            res.status(404);
                            next("Cannot get preferences: cannot find user " + username);
                            return;
                        }

                        res.status(200);
                        res.json(document.orderingPreferences);
                        res.end();
                    }).catch((error) => {
                    console.log("Cannot get preferences: " + error);

                    res.status(500);
                    res.json({message: "Cannot get preferences: " + error.message});
                    res.end();
                });

                break;
            default:
                res.status(400);
                next("Invalid preference type");
                return;
        }
    }
};

module.exports = preferencesController;