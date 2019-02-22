/*
 * Manages the configuration to be used access this backend.
 *
 * To set it:
 * const config = require([PATH_TO_THIS_CONFIG])(configuration);
 *
 * To get it:
 * const config = require([PATH_TO_THIS_CONFIG])();
 */
let config = {};

module.exports = (configuration) => {
    if (configuration) {
        config = configuration;
    }
    return config;
};