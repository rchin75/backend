/*
 * Authentication middleware.
 */

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
};

const isUser = (req, res, next) => {
    if (req.user && (req.user.roles.indexOf('user') > -1)) {
        return next();
    } else {
        return res.send(401);
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.indexOf('admin') > -1)) {
        return next();
    } else {
        return res.send(401);
    }
};


module.exports = {isAuthenticated, isAdmin, isUser};