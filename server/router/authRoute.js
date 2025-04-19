const express = require('express');
const { signup, signin } = require('../controller/authController');
const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/signin', signin);

module.exports = authRoute;