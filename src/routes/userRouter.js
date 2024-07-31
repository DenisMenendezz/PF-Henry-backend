const { Router } = require("express");
const {
  createUserHandler,
  getHandlerByIdUser,
} = require("../handlers/userHandlers");

const routeruser = Router();

routeruser.post("/create", createUserHandler);

routeruser.get("/:email", getHandlerByIdUser);

module.exports = routeruser;
