const express = require('express');
const AuthController = require('./auth.controller');

const router = express.Router();

//prefix /api/v1/auth/
router.post('/login', AuthController.login);

module.exports = router;