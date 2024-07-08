const { Ad } = require('../models');

/**
 * Render admin page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAdModerationPage = async (req, res) => {
    res.render('adModeration', { pageTitle: 'Ad Moderation' });
};

/**
 * Fetch all ads for admin review
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.fetchAllAds = async (req, res) => {
    try {
        const ads = await Ad.findAll();
        if(!ads) throw new Error();
        res.json(ads);
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).json({ error: 'Problem fetching ads. Please try again later.'});
    }
};

/**
 * Approve an ad, checking it exists and isn't already approved
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.approveAd = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Ad.update({ approved: true }, { where: { id } });
        res.json({ message: 'Ad approved successfully.' });
    } catch (error) {
        console.error('Error approving ad:', error);
        error.message = 'Server Error: Error approving message. try again later.'
        next(error)
    }
};

/**
 * Delete an ad, ensuring it exists before attempting deletion
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteAd = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Ad.destroy({ where: { id } });
        res.json({ message: 'Ad deleted successfully.' });
    } catch (error) {
        console.error('Error deleting ad:', error);
        error.message = 'Server Error: Error deleting message. Try again later.'
        next(error)
    }
};