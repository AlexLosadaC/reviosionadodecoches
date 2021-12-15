'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { isAdmin } = require('../../helpers/utils');
const {
  findCarById,
  updateCar
} = require('../../repositories/cars-repository');

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  brand: Joi.string().min(3).max(20).required(),
  model: Joi.string().min(2).max(220).required(),
  year: Joi
    .number()
    .integer()
    .positive()
    .min(1950)
    .max(new Date().getFullYear()),
  engine: Joi.string().valid('Diesel', 'Gasolina', 'Híbrido', 'Eléctrico'),
  cv: Joi.number().integer().positive().min(60).max(500)
});

async function updateCarById(req, res) {
  try {

    const { carId } = req.params;

    await schemaId.validateAsync(carId);


    const { role } = req.auth;

    isAdmin(role);


    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Coche no existe');
    }

    const { body } = req;

    await schema.validateAsync(body);


    await updateCar(carId, body);


    res.status(204)
    res.end();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateCarById;
