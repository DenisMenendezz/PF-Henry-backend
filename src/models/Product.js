const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Product = sequelize.define('products', {
      // Define los atributos de tu modelo aquí
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // otros atributos
    });
    return Product;
  };