/*
 * Model for an article document.
 */
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('article', {
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