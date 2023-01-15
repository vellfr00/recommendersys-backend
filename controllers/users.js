const Users = require('../models/user');
const Preferences = require('../models/preferences');

module.exports = {
    //POST Handler - Register a new user
    registerUser: (req, res, next) => {
        const newUser = new Users({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender
        });

        const newUserPreferences = new Preferences({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save()
            .then((userDoc) => newUserPreferences.save())
            .then((prefDoc) => {
                console.log("New user registered: " + req.body.username);

                res.status(200);
                res.end();
            }).catch((error) => {
            console.log("Cannot register new user: " + error);

            res.status(500);
            next("Cannot register new user: " + error.message);
        });
    },

    //DELETE Handler - Delete user by username
    deleteUser: (req, res, next) => {
        Users.deleteOne({username: req.params.username})
            .then((document) => {
                console.log("Deleted user: " + req.params.username);

                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot delete user: " + error);

                res.status(500);
                next("Cannot delete user: " + error.message);
        });
    },

    //POST Handler - Authenticate user and return user
    getUser: (req, res, next) => {
        if(!req.params.username || !req.params.password) {
            res.status(400);
            next("Missing username");

            return;
        }

        Users.findOne({username: req.params.username},
            {_id: 0, username: 1, firstname: 1, lastname: 1, gender: 1, age: 1})
            .then((document) => {
                if(!document) {
                    res.status(404);
                    next("Wrong username or elicitationId");

                    return;
                }

                res.status(200);

                res.json(document);
                res.end();
            }).catch((error) => {
                console.log("Cannot find user: " + error);

                res.status(500);
                next("Cannot find user: " + error.message);
        });
    }
};