const { Router } = require("express");
const {
  getProductAdminHandler,
  editProductAdminHandler,
  deleteProductAdminHandler,
} = require("../handlers/adminHandlers");

const routerAdmin = Router();

routerAdmin.get("/", getProductAdminHandler);
routerAdmin.put("/edit/:idProduct", editProductAdminHandler);
routerAdmin.put("/delete/:idProduct", deleteProductAdminHandler);

module.exports = routerAdmin;
