const express = require('express');
const usersRouter = express.Router();

const userController = require('../controllers/users');

usersRouter.post('/', userController.registerUser);
usersRouter.delete('/:username', userController.deleteUser);

module.exports = usersRouter;