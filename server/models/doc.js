/*
 * Model for a basic document.
 */
module.exports = (name, sequelize, DataTypes) => {
    const Doc = sequelize.define(name, {
        contents: DataTypes.JSON,
        owner: DataTypes.STRING,
        editor: DataTypes.STRING
    });

    return Doc;
};