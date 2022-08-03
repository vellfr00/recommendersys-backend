const User = require('../models/user');

module.exports = {
    //POST Handler - Register a new user
    registerUser: (req, res, next) => {
        const newUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            elicitationId: req.body.elicitationId
        });

        newUser.save()
            .then((document) => {
                console.log("New user registered: " + req.body.username);

                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot register new user: " + error);

                res.status(500);
                res.json({message: error.message});
                res.end();
        });
    },

    //DELETE Handler - Delete user by username
    deleteUser: (req, res, next) => {
        User.deleteOne({username: req.params.username})
            .then((document) => {
                console.log("Deleted user: " + req.params.username);

                res.status(200);
                res.end();
            }).catch((error) => {
                console.log("Cannot delete user: " + error);

                res.status(500);
                res.json({message: error.message});
                res.end();
        });
    }
};