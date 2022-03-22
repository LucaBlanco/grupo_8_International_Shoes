const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    let config = {
        timestamps: false
    }

    const Users = Sequelize.define(alias, cols, config);
    return Users;
}