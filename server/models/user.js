/*
 * Model for an article document.
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        realName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: false
        },
        profile: DataTypes.JSON
    });

    return User;
};