'use strict';

const express = require('express');
const router = express.Router();
const usersController = require("../controllers/users");
const authenticateUser = require('../middleware/authenticateUser');

// Render login page
router.get('/login', authenticateUser, usersController.getLoginPage);

// Login into a username
router.post('/login', usersController.login);

// Log out and delete session
router.get('/logout', authenticateUser, usersController.logout);

// Render success page after login in successfully
router.get('/login/success', authenticateUser, usersController.getLoginSuccessPage);

module.exports = router;
