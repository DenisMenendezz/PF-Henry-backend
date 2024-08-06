const express = require("express");
const cors = require("cors");
const morgan  = require('morgan') 
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require('fs');
const router = require("./routes/index.js");
const{ stripePost} = require("../src/controllers/stripeController.js"); // Importa las rutas de Stripe
const server = express();





server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use("/", router);
server.use("/api", stripePost); // Usa un prefijo diferente para las rutas de Stripe

//Ruta para cargar las imagenes


// Error catching endware
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
