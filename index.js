const server = require('./src/server.js'); // Requiere el archivo de configuración

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});