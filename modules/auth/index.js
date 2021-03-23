const express = require('express');
const AuthController = require('./auth.controller');

const router = express.Router();

//GET /api/v1/user/search
router.post('/login', AuthController.login);

module.exports = router;