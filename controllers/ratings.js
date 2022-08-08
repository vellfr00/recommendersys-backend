const Ratings = require('../models/rating');
const Movies = require('../models/movie');
const Preferences = require('../models/preferences');

const ratingsController = {
    //POST Handler - Add new rating to movie by its movieId and update probIndex
    addRating: async (req, res, next) => {
        let max, id = req.params.movieId;

        //If user already left a rating for this movie, give error
        let rating = await Ratings.findOne({username: req.body.username, movieId: id});
        if(rating) {
            res.status(400);
            next("Cannot add rating: user already left a rating for this movie");
            return;
        }

        const newRating = new Ratings({
            username: req.body.username,
            movieId: id,
            rating: req.body.rating
        });

        newRating.save()
            .then((document) => Preferences.findOneAndUpdate({username: req.body.username}, {$pull: {toRate: {movieId: id}}}))
            .then((document) => Ratings.countDocuments())
            .then((count) => {
                max = count;

                return Ratings.aggregate([
                    {$group: {_id: "$movieId", count: {$sum: 1}}},
                    {$sort: {count: -1}},
                ]);
            }).then((rs) => {
            rs.forEach((el) => {
                Movies.updateOne({movieId: el._id}, {$set: {probIndex: el.count / max}});
            });
        }).then((doc) => {
            res.status(200);
            res.end();
        }).catch((error) => {
            console.log("Cannot add rating: " + error);

            res.status(500);
            next("Cannot add rating: " + error.message);
        });
    }
};

module.exports = ratingsController;