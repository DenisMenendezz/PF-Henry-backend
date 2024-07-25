const server = require('./src/app.js'); // Requiere el archivo de configuración
const { conn } = require("./src/db.js")

const PORT = process.env.PORT || 3000;

conn.sync({ force: false })
.then(() => {

    console.log("Database connected successfully");

    try {
       server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
   }); 
    } catch (error) {
     console.error("Error starting the server:", error);
     process.exit(1);
    }
       
})
.catch(error => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

// import app from "./app.js"
// import { sequelize } from "./database/database.js"

// // import './models/products.js'

// //Arranca la base de datos y luego el servidor
// async function main() {
//     try {
//         await sequelize.sync({force: false});
//         console.log('Connection has been established successfully.');
//         app.listen(3000);
//         console.log('Server is listening on port', 3000);
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// main();