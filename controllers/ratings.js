const Movies = require('../models/movie');
const Preferences = require('../models/preferences');

const ratingsController = {
    //GET Handler - Get users rated movies or to rate movies
    getRatings: (req, res, next) => {
        let username = req.params.username;

        switch(req.query.rated) {
            case 'true':
                Preferences.findOne({username: username}, {_id: 0, ratings: 1})
                    .then((document) => {
                        if(!document || document.ratings.length === 0) {
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

        let ratings = await Preferences.findOne({username: req.body.username}, {_id: 0, ratings: 1});
        Preferences.findOne({username: req.body.username}, {_id: 0, ratings: 1})
            .then((document) => {
                //If user already left a rating for this movie, give error
                let ratings = document.ratings.map((ratingDoc) => ratingDoc.movie.movieId);
                if(ratings.includes(parseInt(id))) {
                    res.status(400);
                    next("Invalid request data: user already rated this movie");

                    return;
                }

                const newRating = {
                    movie: {movieId: id},
                    rating: req.body.rating
                };

                Preferences.findOneAndUpdate({username: req.body.username},
                    {$push: {ratings: newRating}, $pull: {toRate: {movieId: id}}})
                    .then((document) => { return Preferences.find({}, {_id: 0, ratings: 1}) })
                    .then(async (preferences) => {
                        let N = await Movies.countDocuments();
                        let R = 0, ratings = [];

                        preferences.forEach((p) => {
                            let r = p.ratings;
                            r.forEach((rating) => {
                                let index = ratings.findIndex((e) => e.movieId === rating.movie.movieId);

                                if (index === -1) {
                                    ratings.push({movieId: rating.movie.movieId, count: 1});
                                } else {
                                    let c = ratings[index].count + 1;
                                    ratings[index] = {movieId: rating.movie.movieId, count: c};
                                }

                                R += 1;
                            });
                        });

                        let index = ratings.findIndex((e) => e.movieId === parseInt(id));
                        let n_i = (ratings[index]).count;

                        let decrease = n_i / (2 * R * N);
                        let increase = n_i / (2 * R * N * (N - 1));

                        await Movies.findOneAndUpdate({movieId: id}, {$inc: {probIndex: -decrease}});
                        await Movies.updateMany({$not: {movieId: id}}, {$inc: {probIndex: increase}});

                        res.status(200);
                        res.end();
                    }).catch((error) => {
                        res.status(500);
                        next(error.message);
                });
            }).catch((error) => {
            res.status(500);
            next(error.message);
        });
    }
};

module.exports = ratingsController;