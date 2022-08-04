const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

apiRouter.use('/users', usersRouter);
apiRouter.use('/movies', moviesRouter);

module.exports = apiRouter;