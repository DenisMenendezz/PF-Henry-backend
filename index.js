 // Asegúrate de que esta línea apunte al archivo correcto
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('../PF-Henry-backend/src/routes/index.js');
const { conn } = require('./src/db.js');// Asegúrate de que esta línea apunte al archivo correcto
const PORT = process.env.PORT || 3000;
const server = express();

server.name = 'API';
server.use(cors());

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Actualiza para que coincida con el dominio de tu aplicación
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', router);

conn.sync({ force: false, alter: true }).then(() => {
  console.log('Database & tables created!');
}).catch(error => {
  console.error('Error syncing with the database:', error);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
