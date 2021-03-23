const express = require('express');
const CategoryController = require('./category.controller');
// const BaseMiddleware = require('../../middleware/base');
const AuthMiddleware = require('../../middleware/auth');

const router = express.Router();

//GET /api/v1/category/search
router.get('/find', CategoryController.search);

module.exports = router;