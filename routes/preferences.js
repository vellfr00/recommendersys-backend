const express = require('express');
const preferencesRouter = express.Router();

const preferencesController = require('../controllers/preferences');

preferencesRouter.get('/:username', preferencesController.getPreferences);
preferencesRouter.post('/:username', preferencesController.addPreference);

module.exports = preferencesRouter;