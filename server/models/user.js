/*
 * Model for an article document.
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        realName: DataTypes.STRING,
        email: DataTypes.STRING,
        roles: DataTypes.JSON,
        profile: DataTypes.JSON
    });

    return User;
};