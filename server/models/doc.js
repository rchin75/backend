module.exports = (sequelize, DataTypes) => {
    const Doc = sequelize.define('doc', {
        contents: DataTypes.JSON
    });

    return Doc;
};