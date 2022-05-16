const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (Sequelize, DataTypes) => {
    let alias = "Sizes";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        arg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        br: {
            type: DataTypes.STRING,
            allowNull: true
        },
        uk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        us_man: {
            type: DataTypes.STRING,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        eur: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cm: {
            type: DataTypes.DATE,
            allowNull: true
        }
    };
    let config = {
        timestamps: false
    }

    const Sizes = Sequelize.define(alias, cols, config);
    Sizes.associate = function(models){
        Sizes.belongsToMany(models.Products, {
            as: "productos",
            through: "productId",
            foreingKey: "products_sizes",
            othreKey: "sizeId",
            timestamps: false
        })
    }
    return Sizes;
}