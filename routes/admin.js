'use strict';

const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const { adExists, adNotApproved } = require('../middleware/verificateAd');
const adminController = require('../controllers/admin');

// Render admin page
router.get('/adModeration', authenticateUser, adminController.getAdModerationPage);

// Fetch all ads for admin review
router.get('/adModeration/ads', authenticateUser, adminController.fetchAllAds);

// Approve an ad, checking it exists and isn't already approved
router.post('/adModeration/:id', authenticateUser, adExists, adNotApproved, adminController.approveAd);

// Delete an ad, ensuring it exists before attempting deletion
router.delete('/adModeration/:id', authenticateUser, adExists, adminController.deleteAd);

module.exports = router;