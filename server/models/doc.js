/*
 * Model for a basic document.
 */
module.exports = (sequelize, DataTypes) => {
    const Doc = sequelize.define('doc', {
        contents: DataTypes.JSON,
        username: DataTypes.STRING
    });

    return Doc;
};