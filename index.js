const server = require("./src/app.js"); // Asegúrate de que esta línea apunte al archivo correcto
const sequelize = require('./src/db'); // Asegúrate de que esta línea apunte al archivo correcto
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Database & tables created!');
}).catch(error => {
  console.error('Error syncing with the database:', error);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
