const { Router } = require("express");
const {
  getProductAdminHandler,
  editProductAdminHandler,
  deleteProductAdminHandler,
  getUserAdminHandler,
  editUserAdminHandler,
  deleteUserAdminHandler,
} = require("../handlers/adminHandlers");

const routerAdmin = Router();

routerAdmin.get("/", getProductAdminHandler);
routerAdmin.put("/edit/:idProduct", editProductAdminHandler);
routerAdmin.put("/delete/:idProduct", deleteProductAdminHandler);
routerAdmin.get("/user", getUserAdminHandler);
routerAdmin.put("/user/edit/:idUser", editUserAdminHandler);
routerAdmin.put("/user/delete/:idUser", deleteUserAdminHandler);

module.exports = routerAdmin;
