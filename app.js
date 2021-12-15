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


app.use(fileUpload());

app.use(express.static('public'));

app.use(express.json());

app.use(cors());

const brandsRouter = require('./app/routes/brands-routes');
const carsRouter = require('./app/routes/cars-routes');
const reviewsRouter = require('./app/routes/reviews-routes');
const usersRouter = require('./app/routes/users-routes');

const titularesRouter = require('./app/routes/titulares-routes');


const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/cars/', carsRouter);
app.use('/api/v1/reviews/', reviewsRouter);
app.use('/api/v1/users/', usersRouter);

app.use('/api/v1/titulares/', titularesRouter);

app.listen(port, () => console.log(`Running ${port}`));