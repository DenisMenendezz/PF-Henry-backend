const express = require("express");
const cors = require("cors");
const morgan  = require('morgan') 
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
<<<<<<< HEAD
=======
const morgan = require("morgan");
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Asegúrate de usar .v2
const fs = require('fs');
>>>>>>> 8725ebc2c019210247dc7a3c763176cddfe6a534
const router = require("./routes/index.js");
const stripeRouter = require("./routes/routerstripe.js"); // Importa las rutas de Stripe
const server = express();

<<<<<<< HEAD
=======
// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
>>>>>>> 8725ebc2c019210247dc7a3c763176cddfe6a534




server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use("/", router);
server.use("/api", stripeRouter); // Usa un prefijo diferente para las rutas de Stripe

<<<<<<< HEAD
//Ruta para cargar las imagenes

=======
// Ruta para cargar las imágenes
server.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Elimina el archivo localmente después de subirlo
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
>>>>>>> 8725ebc2c019210247dc7a3c763176cddfe6a534

// Error catching endware
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
