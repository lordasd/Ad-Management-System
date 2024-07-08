'use strict';

const {User} = require("../Models");

/**
 * Render login page
 * @param req
 * @param res
 */
exports.getLoginPage = (req, res) => {
    const formData = {
        errors: {}, // Initialize errors as an empty object
        username: '', // Empty or default values for the rest of the form fields
        password: '',
    };

    res.render('login', { pageTitle: "Login", ...formData});
}

/**
 * Login into a username
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.login = async (req, res, next) => {
    const formData = {
        errors: {},
        username: req.body.username || '',
        password: req.body.password || '',
    };

    try {
        const user = await User.findOne({ where: { username: formData.username } });

        // Instead of comparing the password directly, use the validPassword method
        if (user && await user.validPassword(formData.password)) {
            req.session.isLogged = true;
            req.session.username = formData.username;
            res.redirect('/login/success');
        } else {
            // If authentication fails, pass the entered username back to the view along with the error message
            formData.errors.generic = "Incorrect username or password.";
            res.render('login', { pageTitle: "Login", ...formData });
        }
    } catch (error) {
        console.error('Error during login:', error);
        error.message = 'Failed to login. Please try again later.';
        next(error);
    }
};

/**
 * Log out and delete session
 * @param req
 * @param res
 */
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

/**
 * Render success page after login in successfully
 * @param req
 * @param res
 */
exports.getLoginSuccessPage = (req, res) => {
    res.render('success', { pageTitle: 'Logged in', successText: 'Logged in successfully! Continue to ad moderation page' , link: "/adModeration", linkText: "Go to Ad Moderation Page"});
}