const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    let alias = "products_sizes";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sizeId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        timestamps: false
    }

    const products_sizes = Sequelize.define(alias, cols, config);
    return products_sizes;
}