/*
 * Model for an article document.
 */
module.exports = (name, sequelize, DataTypes) => {
    const Article = sequelize.define(name, {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        issue: DataTypes.STRING,
        sequenceNumber: DataTypes.INTEGER,
        contents: DataTypes.JSON,
        owner: DataTypes.STRING,
        editor: DataTypes.STRING
    });

    return Article;
};