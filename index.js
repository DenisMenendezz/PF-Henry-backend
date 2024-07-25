const server = require('./src/server.js'); // Requiere el archivo de configuración

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
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