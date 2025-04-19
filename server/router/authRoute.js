const express = require('express');
const { signup } = require('../controller/authController');
const authRoute = express.Router();

authRoute.post('/signup', signup);

module.exports = authRoute;