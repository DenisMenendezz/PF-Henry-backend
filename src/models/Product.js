const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
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
        type: DataTypes.JSONB, // Cambia la estructura del stock
        allowNull: false,
        defaultValue: {}, // Define el stock inicial vacío para cada talle
        validate: {
          customValidator(value) {
            // Validación para asegurarse de que las claves coincidan con los tamaños permitidos
            const allowedSizes = ["S", "M", "L", "XL", "XXL"];
            if (
              !Object.keys(value).every((size) => allowedSizes.includes(size))
            ) {
              throw new Error("Invalid size in stock");
            }
            if (
              !Object.values(value).every(
                (qty) => typeof qty === "number" && qty >= 0
              )
            ) {
              throw new Error("Invalid stock quantity");
            }
          },
        },
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
        defaultValue: true, // Por defecto, un producto está activo
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          customValidator(value) {
            const allowedSizes = ["S", "M", "L", "XL", "XXL"];
            if (!value.every((size) => allowedSizes.includes(size))) {
              throw new Error("Validation isIn on size failed");
            }
          },
        },
      },
    },
    { timestamps: false }
  );
};
