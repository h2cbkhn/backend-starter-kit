const express = require('express');
const User = require('../modules/user');
const Category = require('../modules/category');
// const Core = require('./core/controllers');
// const Auth = require('./modules/auth');

const app = express();

// app.use('/core', Core);
app.use('/user', User);
app.use('/category', Category);
// app.use('/auth', Auth);

module.exports = app;