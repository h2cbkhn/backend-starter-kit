const express = require('express');
const CategoryController = require('./category.controller');
// const BaseMiddleware = require('../../middleware/base');
const AuthMiddleware = require('../../middleware/auth');

const router = express.Router();

//prefix /api/v1/category/
router.get('/search', CategoryController.search);
router.post('/create', CategoryController.create);
router.put('/update/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;