const express = require('express');

const route = express.Router();
const categoryController = require('../controllers/categoryController');


route.get('/add_category', categoryController.add_category); 

route.post('/insertCategoryData', categoryController.insertCategoryData);

route.get('/view_category', categoryController.viewCategory);

route.get('/deactiveStatus/:id',categoryController.deactiveStatus);

route.get('/activeStatus/:id',categoryController.activeStatus);

route.post('/searchingData',categoryController.searchingData);



module.exports = route;