/*
 * Authentication middleware.
 */

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.sendStatus(401);
    }
};

const loginIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
};

const isUser = (req, res, next) => {
    if (req.user && (req.user.roles.indexOf('user') > -1)) {
        return next();
    } else {
        return res.sendStatus(401);
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.roles.indexOf('admin') > -1)) {
        return next();
    } else {
        return res.sendStatus(401);
    }
};

/**
 * Grants access if the user has the specified role.
 * Special values:
 * - 'any': A user with any role is granted access.
 * - 'none': Any logged in user with or without roles is granted access.
 * - null: No restrictions, everyone is granted access.
 * @param role A role, or 'any', or 'none', or null.
 * @return {function(*, *, *)}
 */
const hasRole = (role) => {
    const middleware = (req, res, next) => {
        if (!role) {
            // Nothing to check, so access is allowed.
            return next();
        } else if (req.user) {
            if ((role === 'any') && (req.user.roles.length > 0)) {
                // Any roles grants access.
                return next();
            } else if (role === 'none') {
                // Any logged in user with or without roles is granted access.
                return next();
            } else if (req.user.roles.indexOf(role) > -1) {
                // A user who has the specified role is granted access.
                return next();
            } else {
                return res.sendStatus(401);
            }
        } else {
            return res.sendStatus(401);
        }
    };
    return middleware;
};


module.exports = {loginIfNotAuthenticated, isAuthenticated, isAdmin, isUser, hasRole};