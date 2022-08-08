const express = require('express');
const moviesRouter = express.Router();

const moviesController = require('../controllers/movies');

moviesRouter.get('/proposed', moviesController.getProposedMovies);
moviesRouter.get('/:movieId', moviesController.getMovie);

moviesRouter.post('', moviesController.addMovie);
moviesRouter.delete('/:movieId', moviesController.deleteMovie);

module.exports = moviesRouter;