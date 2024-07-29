const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const router = require("./routes/index.js");

require("dotenv").config();
require("./db.js");

const server = express();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

server.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use("/", router);

server.post("/upload", upload.single('image'), async (req, res) => {
  try {
    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Elimina el archivo temporal después de subirlo
    fs.unlinkSync(req.file.path);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
