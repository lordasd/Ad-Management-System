'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Initialize Ad model
 * @param sequelize
 * @returns {Ad}
 */
module.exports = (sequelize) => {
    class Ad extends Model {}
    Ad.init({
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Title must not be blank."
                },
                len: {
                    args: [1, 20],
                    msg: "Title length must be 0 < length <= 20."
                },
            }
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 200],
                    msg: "Title length must not go over 200."
                },
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isDecimal: true,
                notEmpty: {
                    msg: "Price must not be blank."
                },
                min: {
                    args: [0],
                    msg: "Price must be greater than or equal to 0."
                },
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                    if (value !== '' && !/^\d{2,3}-\d{7}$/.test(value))
                        throw new Error('Phone number must match the format XX/X-XXXXXXX.');
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Email must not be blank."
                },
                isEmail: {
                    msg: "Please enter a valid email address (e.g., user@example.com)."
                }
            }
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Ads are not approved by default
        },
    }, {
        sequelize,
        modelName: 'Ad',
        timestamps: true, // Enable Sequelize to add createdAt and updatedAt timestamps
    });

    return Ad;
};