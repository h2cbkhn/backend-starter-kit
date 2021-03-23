const express = require('express');
const DanhMucController = require('./danh_muc.controller');
// const BaseMiddleware = require('../../middleware/base');
const AuthMiddleware = require('../../middleware/auth');

const router = express.Router();

//GET /api/v1/danh-muc/search
router.get('/find', DanhMucController.search);

module.exports = router;