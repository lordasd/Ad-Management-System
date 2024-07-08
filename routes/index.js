'use strict';

const express = require('express');
const router = express.Router();
const adsController = require('../controllers/index');

// GET home page - shows all approved ads, most recent first.
router.get('/', adsController.getLandingPage);

// Filter ads by title - show approved ads, most recent first.
router.post('/', adsController.fetchFilteredAds);

module.exports = router;