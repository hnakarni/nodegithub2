const express = require('express');

const routes = express.Router();

const subController = require('../controllers/subcategoryController');

routes.get('/add_subcategory', subController.addSubcategory);

routes.post('/insertSubcategoryData', subController.insertSubcategoryData);

routes.get('/view_subcategory',subController.viewSubcategory);

module.exports = routes;