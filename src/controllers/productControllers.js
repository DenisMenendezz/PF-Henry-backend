const { Product } = require ('../db');

const getproducts = async (req, res) => {
    try {
        
        const products = await Product.findAll()
    res.json(products)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
}

const createproducts = async (req, res) => {
    const {name, description,color,brand,price,images,stock,gender,category,size, } = req.body;

    try {
        const newproducts = await Product.create({
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
    })

    res.json(newproducts);
    console.log(req.body);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }


}

module.exports = {
    getproducts,
    createproducts,
};