'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

/**
 * Initialize user model
 * @param sequelize
 * @returns {User}
 */
module.exports = (sequelize) => {
    class User extends Model {
        // Method to compare entered password with hashed password
        async validPassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        hooks: {
            async beforeCreate(user) {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        },
        sequelize,
        modelName: 'User',
    });

    return User;
};
