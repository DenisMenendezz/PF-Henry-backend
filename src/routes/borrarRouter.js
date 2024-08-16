const { Router } = require("express");
const { borrarUserHandler } = require("../handlers/borrarHandler");

const routerBorrar = Router();

routerBorrar.delete("/user/:idUser", borrarUserHandler);

module.exports = routerBorrar;
