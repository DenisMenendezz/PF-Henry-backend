const { controllerCreateProduct, controllerGetProducts, controllerDeleteProduct } = require("../controllers/productControllers");



const postProduct = async(req, res) => {
    const { name, price, images, stock, gender,category, size } = req.body;
    if(!name || !price || !images || !stock|| !gender || category || size ){
        return res.status(400).send("Name, price,stock, gender,category and size are required");
    }
    try {
        const newProduct = await controllerCreateProduct(
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
        )
        res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        res.status(500).send(`Error creating product: ${error.message}`);
    }
}


const getProducts = async (req, res) => {
    try {
        const getAllProducts = await controllerGetProducts();
        res.status(200).json(getAllProducts)
    } catch (error) {
        res.status(500).send(`Error fetching products: ${error.message}`);
    }
};


const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const product = await controllerDeleteProduct(idProduct);
        res.status(200).json({message: "Product deleted successfully", product});
    } catch (error) {
        res.status(500).send(`Error deleting product: ${error.message}`);
    }
}


module.exports = {
    postProduct,
    getProducts,
    deleteProduct,
};