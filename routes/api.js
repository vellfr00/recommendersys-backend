const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const preferencesRouter = require('./preferences');
const ratingsRouter = require('./ratings');

apiRouter.use('/users', usersRouter);
apiRouter.use('/movies', moviesRouter);
apiRouter.use('/preferences', preferencesRouter);
apiRouter.use('/ratings', ratingsRouter);

//Last Middleware - Send error message as JSON
apiRouter.use(function(err, req, res, next) {
    res.json({message: err});
    res.end();
});

module.exports = apiRouter;