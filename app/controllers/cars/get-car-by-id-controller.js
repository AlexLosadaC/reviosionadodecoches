'use strict';
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findCarById } = require('../../repositories/cars-repository');

async function getCarById(req, res) {
  try {
    const { id } = req.params;

    const car = await findCarById(id);
    if (car.length === 0) {
      throwJsonError(400, 'Parámetro no válido');
    }
    res.status(200);
    res.send(car); //res.json(car);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarById;