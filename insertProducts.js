const fs = require("fs");
const axios = require("axios");

const products = JSON.parse(fs.readFileSync("data/products.json", "utf8"));

const insertProducts = async () => {
  for (const product of products) {
    try {
      const response = await axios.post(
        "http://localhost:3000/product/create",
        product
      );
      console.log(`Inserted: ${response.data.name}`);
    } catch (error) {
      console.error(`Failed to insert: ${product.name}`, error.message);
    }
  }
};

insertProducts();
