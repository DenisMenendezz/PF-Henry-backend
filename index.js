// index.js
const server = require('./src/app');
const { conn } = require('./src/db');

const PORT = process.env.PORT || 10000;

conn.sync({ force: false, alter: true }).then(() => {
  console.log('Database & tables created!');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error syncing with the database:', error);
});
