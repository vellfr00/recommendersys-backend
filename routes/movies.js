const express = require('express');
const moviesRouter = express.Router();

const moviesController = require('../controllers/movies');

moviesRouter.get('/proposed', moviesController.getProposedMovies);
moviesRouter.get('/:movieId', moviesController.getMovie);

module.exports = moviesRouter;