const { Sequelize } = require('sequelize');
const path = require('path')
const fs = require('fs')
require('dotenv').config();
const {
  DATABASE_URL,
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require:true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const basename = path.basename(__filename);
  const modelDefiners = [];
  
  // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
  fs.readdirSync(path.join(__dirname, "/models")).
  filter(file=>{
    return(file.indexOf('.')!== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file=>{
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })
  // Injectamos la conexión (sequelize) a todos los modelos
  modelDefiners.forEach(model=> model(sequelize));
  // Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capEntries = entries.map(entry =>{
  return [entry[0][0].toUpperCase()+entry[0].slice(1), entry[1]]
})
sequelize.models = Object.fromEntries(capEntries)

const {Product} = sequelize.models;

// Relacionamos los modelos aquí
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};