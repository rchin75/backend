/*
 * Model for a basic document.
 */
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('event', {
        name: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        contents: DataTypes.JSON,
        username: DataTypes.STRING
    });

    return Event;
};