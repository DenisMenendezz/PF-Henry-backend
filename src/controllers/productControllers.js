const { Products } = require ('../models/product.js');

export const getproducts = async (req, res) => {
    try {
        const products = await Products.findAll()
    res.json(products)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
}

export const createproducts = async (req, res) => {
    const {name, description,color,brand,price,images,stock,gender,category,size, } = req.body;

    try {
        const newproducts = await Products.create({
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