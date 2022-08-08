const express = require('express');
const ratingsRouter = express.Router();

const ratingsController = require('../controllers/ratings');

ratingsRouter.post('/:movieId', ratingsController.addRating);

module.exports = ratingsRouter;