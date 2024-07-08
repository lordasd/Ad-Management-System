'use strict';

const express = require('express');
const router = express.Router();
const postController = require("../controllers/adForm")

// Render ad posting form page
router.get('/postAd', postController.getAdFormPage);

// Render success page after posting successfully a post
router.get('/postAd/success', postController.getAdConfirmationPage);

// Post an ad
router.post('/postAd', postController.postAd);

module.exports = router;