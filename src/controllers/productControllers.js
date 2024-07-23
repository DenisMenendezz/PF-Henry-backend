const { Product } = require("../db.js");



const controllerCreateProduct = async (
    name,
    description,
    color,
    brand,
    price,
    images,
    stock,
    gender,
    category,
    size,
) => {
    try {
        const newProduct = await Product.create({
            name,
            description,
            color,
            brand,
            price,
            images,
            stock,
            gender,
            category,
            size, 
        });
        return newProduct;
    } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
    }
}

const controllerGetProducts = async() =>{
    try {
        const products = await Product.findAll()
        return products;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
};


const controllerDeleteProduct = async(idProduct) => {
    try {
        const product = await Product.findByPk(idProduct);
        if(!product) {
            throw new Error("The activity doesn`t exist");
        }
        await product.destroy();
        return product;
    } catch (error) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
};

module.exports = {
    controllerCreateProduct,
    controllerGetProducts,
    controllerDeleteProduct,
};