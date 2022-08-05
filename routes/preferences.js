const express = require('express');
const preferencesRouter = express.Router();

const preferencesController = require('../controllers/preferences');

preferencesRouter.post('/selection/:username', preferencesController.addSelectionPreference);
preferencesRouter.post('/ordering/:username', preferencesController.addOrderingPreference);

module.exports = preferencesRouter;