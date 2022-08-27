const express = require('express');
const ratingsRouter = express.Router();

const ratingsController = require('../controllers/ratings');

ratingsRouter.get('/:username', ratingsController.getRatings);
ratingsRouter.post('/:movieId', ratingsController.addRating);

module.exports = ratingsRouter;