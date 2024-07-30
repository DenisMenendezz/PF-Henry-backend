// index.js
const server = require('./src/app');
const { conn } = require('./src/db');

const PORT = process.env.PORT || 3001;

conn.sync({ force: true, alter: true }).then(() => {
  console.log('Database & tables created!');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error syncing with the database:', error);
});
