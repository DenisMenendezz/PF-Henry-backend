const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("product", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: { 
            type: DataTypes.STRING, 
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true // Por defecto, un producto está activo
        },
        size: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                customValidator(value) {
                    const allowedSizes = ['S', 'M', 'L', 'XL', 'XXL'];
                    if (!value.every(size => allowedSizes.includes(size))) {
                        throw new Error("Validation isIn on size failed");
                    }
                }
            }
        },
    }, { timestamps: false });
};
