const Ratings = require('../models/rating');
const Movies = require('../models/movie');
const Preferences = require('../models/preferences');

const ratingsController = {
    //GET Handler - Get users rated movies or to rate movies
    getRatings: (req, res, next) => {
        let username = req.params.username;

        switch(req.query.rated) {
            case 'true':
                Ratings.find({username: username}).populate('movie')
                    .then((document) => {
                        if(!document) {
                            res.status(404);
                            next("No ratings for user " + username);
                            return;
                        }

                        res.status(200);
                        res.json(document);
                        res.end();
                    }).catch((error) => {
                    console.log("Cannot get user ratings: " + error);

                    res.status(500);
                    res.json({message: "Cannot get user ratings: " + error.message});
                    res.end();
                });

                break;
            case 'false':
                Preferences.findOne({username: username}, {_id: 0, toRate: 1})
                    .then((document) => {
                        if (!document) {
                            res.status(404);
                            next("Cannot get to rate movies: cannot find user " + username);
                            return;
                        }

                        if(document.toRate.length === 0) {
                            res.status(404);
                            next("No movies to rate for user " + username);
                            return;
                        } else {
                            let toRateIds = document.toRate.map((movie) => movie.movieId);

                            return Movies.find({movieId: {$in: toRateIds}})
                                .then((movies) => {
                                    res.status(200);
                                    res.json(movies);
                                    res.end();
                                })
                        }
                    }).catch((error) => {
                    console.log("Cannot get to rate movies: " + error);

                    res.status(500);
                    res.json({message: "Cannot get to rate movies: " + error.message});
                    res.end();
                });

                break;
            default:
                res.status(400);
                next("Invalid rated status type");
                return;
        }
    },

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