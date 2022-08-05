const Users = require('../models/user');
const Preferences = require('../models/preferences');

module.exports = {
    //POST Handler - Register a new user
    registerUser: (req, res, next) => {
        const newUser = new Users({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            elicitationId: req.body.elicitationId
        });

        const newUserPreferences = new Preferences({
            username: req.body.username
        });

        newUser.save()
            .then((userDocument) => newUserPreferences.save())
            .then((prefDocument) => {
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
    }
};