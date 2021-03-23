const express = require('express');
const UserController = require('./user.controller');
// const BaseMiddleware = require('../../middleware/base');
const AuthMiddleware = require('../../middleware/auth');

const router = express.Router();

//GET /api/v1/user/search
router.get('/search', UserController.search);

router.post('/create', UserController.create);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);

module.exports = router;