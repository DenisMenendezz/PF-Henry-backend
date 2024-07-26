const server = require('./src/app.js'); // Requiere el archivo de configuración
const { conn } = require("./src/db.js")


const PORT = process.env.PORT || 3000;

conn.sync({ force: false, alter: true })
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
