const express = require('express');
const moviesRouter = express.Router();

const moviesController = require('../controllers/movies');

moviesRouter.get('/selection', moviesController.getMoviesSelection);

module.exports = moviesRouter;