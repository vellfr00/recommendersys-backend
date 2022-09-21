const Config = require('../models/config');

module.exports = {
    updateConfig: (req, res, next) => {
        let variable = req.body.variable, value = req.body.value;

        if(!variable || !value || !Number.isInteger(value)) {
            res.status(400);
            next("Invalid request data: data empty or wrong value format");
            return;
        }

        switch (variable) {
            case 'selectionMovies':
                if(value < 2) {
                    res.status(400);
                    next("Value for selectionMovies must be >= 2");
                    return;
                }

                Config.findOneAndUpdate({}, {$set: {selectionMovies: value}})
                    .then((document) => {
                        res.status(200);
                        res.end();
                    }).catch((error) => {
                        res.status(500);
                        next(error.message);
                });

                break;
            case 'orderingMovies':
                if(value < 2) {
                    res.status(400);
                    next("Value for selectionMovies must be >= 2");
                    return;
                }

                Config.findOneAndUpdate({}, {$set: {orderingMovies: value}})
                    .then((document) => {
                        res.status(200);
                        res.end();
                    }).catch((error) => {
                    res.status(500);
                    next(error.message);
                });

                break;
            case 'minElicitIterations':
                if(value < 1) {
                    res.status(400);
                    next("Value for selectionMovies must be >= 1");
                    return;
                }

                Config.findOneAndUpdate({}, {$set: {minElicitIterations: value}})
                    .then((document) => {
                        res.status(200);
                        res.end();
                    }).catch((error) => {
                    res.status(500);
                    next(error.message);
                });

                break;
            default:
                res.status(400);
                next("Invalid variable");
                return;
        }
    },

    getConfig: (req, res, next) => {
        Config.findOne({})
            .then((document) => {
                res.status(200);
                res.json(document);
                res.end();
            }).catch((error) => {
                res.status(500);
                next(error.message);
        });
    }
};