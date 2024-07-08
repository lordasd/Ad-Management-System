'use strict';

const { Ad } = require('../models');

/**
 * Helper function to get last ad information from cookies
 * @param req
 * @returns {{lastEmail: string, lastAdDate: string}}
 */
const getLastAdInfo = (req) => {
    if (req.cookies.lastAdInfo) {
        const lastAdInfo = JSON.parse(req.cookies.lastAdInfo);
        return { lastEmail: lastAdInfo.email, lastAdDate: lastAdInfo.lastAdDate };
    }
    return { lastEmail: '', lastAdDate: '' }; // Default values if no cookie is set
};

/**
 * Render Ad form page
 * @param req
 * @param res
 */
exports.getAdFormPage = (req, res) => {
    const { lastEmail, lastAdDate } = getLastAdInfo(req);

    res.render('postAd', {
        pageTitle: 'Post Your Ad',
        errors: {},
        title: '',
        description: '',
        price: '',
        phoneNumber: '',
        email: '',
        lastEmail,
        lastAdDate
    });
};

/**
 * Render success page after posting an Ad
 * @param req
 * @param res
 */
exports.getAdConfirmationPage = (req, res) => {
    res.render('success', {
        pageTitle: 'Ad Posted Successfully!',
        successText: 'Your ad was successfully posted and is waiting for approval.',
        link: '/' ,
        linkText: "Go to Home Page"
    });
};

/**
 * Prepare errors from DB to render
 * @param error
 * @returns {{}}
 */
const handleSequelizeValidationError = (error) => {
    const errors = {};
    error.errors.forEach((item) => {
        errors[item.path] = item.message;
    });
    return errors;
};

/**
 * Post an Ad
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postAd = async (req, res) => {
    const { title, description, price, phoneNumber, email } = req.body;

    try {
        await Ad.create({
            title,
            description,
            price,
            phoneNumber,
            email,
            approved: false
        });

        const lastAdDate = new Date().toISOString().split('T')[0];
        res.cookie('lastAdInfo', JSON.stringify({ email, lastAdDate }), { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        res.redirect('/postAd/success');
    } catch (error) {
        console.error('Error creating ad:', error);

        if (error.name === 'SequelizeValidationError') {
            const errors = handleSequelizeValidationError(error, req);
            const { lastEmail, lastAdDate } = getLastAdInfo(req);

            return res.render('postAd', {
                pageTitle: 'Post Your Ad',
                errors,
                title, description, price, phoneNumber, email, lastEmail, lastAdDate
            });
        } else
            res.status(500).render('500', { pageTitle: 'Server Error', error: 'There was a problem posting your ad. Please try again later.' });
    }
};