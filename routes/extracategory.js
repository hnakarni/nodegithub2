const express = require('express');

const routes = express.Router();

const extracategoryController = require('../controllers/extracategoryController');


routes.get('/add_extracategory',extracategoryController.extrpage);

routes.post('/subdata', extracategoryController.subdata);

routes.post('/insertExtracategoryData', extracategoryController.insertExtracategoryData);

module.exports = routes;