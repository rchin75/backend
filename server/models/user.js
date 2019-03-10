/*
 * Model for an article document.
 */

const {hashPassword} = require('./../auth/hash');

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

    User.beforeCreate((user,options) => {
        return new Promise((resolve, reject) =>{
            hashPassword(user.password).then((hash)=>{
                user.password = hash;
                return resolve(user, options);
            }).catch(err =>{
                return reject(err);
            });
        });
    });

    User.beforeUpdate((user,options) => {
        if (!user.changed('password')) {
            return;
        }
        return new Promise((resolve, reject) =>{
            hashPassword(user.password).then((hash)=>{
                user.password = hash;
                return resolve(user, options);
            }).catch(err =>{
                return reject(err);
            });
        });
    });

    return User;
};