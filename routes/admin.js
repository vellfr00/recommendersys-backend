const express = require('express');
const adminRouter = express.Router();

const adminController = require('../controllers/admin');

adminRouter.get('/', adminController.getConfig);
adminRouter.patch('/', adminController.updateConfig);

module.exports = adminRouter;