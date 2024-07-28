const server = require('./src/server'); // Requiere el archivo de configuración
const {config} = require('dotenv');
const pg = require("pg");
const { conn } = require('./src/db.js');
config()
new pg.Pool({
    connectionString:process.env.DATABASE_URL
})

const PORT = process.env.PORT || 3000;

conn.sync({ force: true }).then(() => {
    server.listen(3000, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
