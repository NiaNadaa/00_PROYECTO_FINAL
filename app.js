require('dotenv').config();

const express = require('express');
const cors = require('cors');
//cors , permisos, cabeceras, qe puedan ahcer post, get, etc
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// Rutas, queda a la escucha de estos endpoints, la ruta a donde hago la petición
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/medics', require('./routes/medics') );
app.use( '/api/patients', require('./routes/patients') );

app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT );
});
