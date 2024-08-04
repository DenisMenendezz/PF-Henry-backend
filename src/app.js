// src/app.js
const express = require("express");
const cors = require("cors");
const morgan  = require('morgan') 
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./routes/index.js");
const server = express();





server.use(cors());

// server.use(
//   cors({
//     // origin: 'http://localhost:10000',
//     // credentials: true
//   })
// );

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use("/", router);

//Ruta para cargar las imagenes


// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// const port = process.env.PORT || 3001;
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = server;
