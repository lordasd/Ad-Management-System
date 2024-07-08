const { Ad } = require('../models');

/**
 * Check if an Ad exists in DB
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.adExists = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ad = await Ad.findOne({ where: { id } });
        if (!ad)
            return res.status(404).send("Ad does not exist, please refresh the page.");

        req.ad = ad;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Check if an Ad is approved
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.adNotApproved = (req, res, next) => {
    // Assuming adExists has already run, ad should be attached to req
    if (req.ad && req.ad.approved)
        return res.status(400).send("Ad already approved, please refresh the page.");
    next();
};