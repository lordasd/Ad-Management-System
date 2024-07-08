/**
 * Check if a user has an active session(logged in)
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const authenticateUser = async (req, res, next) => {
    if (!req.session.username && req.path !== '/login')
        return res.redirect('/login');
    else if(req.session.username && req.path === '/login')
        return res.redirect('/adModeration');

    next();
};

module.exports = authenticateUser;