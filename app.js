'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');

const { PORT } = process.env;
const port = PORT | 3000;

// Para subir ficheros
app.use(fileUpload());
// Para mostrar ficheros, imagenes, css... en carpeta public
app.use(express.static('public'));
// Recibir datos como json en el body
app.use(express.json());
// CORS - dar permisos de acceso a otras URLs
app.use(cors());

const brandsRouter = require('./app/routes/brands-routes');
const carsRouter = require('./app/routes/cars-routes');
const reviewsRouter = require('./app/routes/reviews-routes');
const usersRouter = require('./app/routes/users-routes');
// Ejemplo de uso de axios para coger información de otras APIs
const titularesRouter = require('./app/routes/titulares-routes');

// Creamos un fichro de LOG con Morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/cars/', carsRouter);
app.use('/api/v1/reviews/', reviewsRouter);
app.use('/api/v1/users/', usersRouter);
// Eemplo Axios para obtener información de una API
app.use('/api/v1/titulares/', titularesRouter);

app.listen(port, () => console.log(`Running ${port}`));