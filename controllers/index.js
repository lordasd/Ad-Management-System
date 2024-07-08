'use strict';

const { Op } = require('sequelize');
const { Ad } = require('../models');


/**
 * Fetch ads depending on the filter(Criteria)
 * @param criteria
 * @param pageTitle
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const fetchAds = async (criteria, pageTitle, req, res, next) => {
    try {
        const ads = await Ad.findAll(criteria);
        res.render('landingPage', { pageTitle, ads });
    } catch (error) {
        console.error(`Error fetching ads: ${error}`);
        error.message = 'Error fetching ads';
        next(error);
    }
}

/**
 * GET home page - shows all approved ads, most recent first.
 * @param req
 * @param res
 * @param next
 */
exports.getLandingPage = (req, res, next) => {
    const criteria = {
        where: { approved: true },
        order: [['createdAt', 'DESC']]
    };
    fetchAds(criteria, "Welcome", req, res, next);
};

/**
 * Filter ads by title - show approved ads, most recent first.
 * @param req
 * @param res
 * @param next
 */
exports.fetchFilteredAds = (req, res, next) => {
    const { search } = req.body;
    const criteria = {
        where: {
            title: { [Op.like]: `%${search}%` },
            approved: true
        },
        order: [['createdAt', 'DESC']]
    };
    fetchAds(criteria, "Search Results", req, res, next);
};