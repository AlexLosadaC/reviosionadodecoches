'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { isAdmin } = require('../../helpers/utils');
const {
  findCarByBrandAndModel,
  findCarById,
  updateCar
} = require('../../repositories/cars-repository');

const schemaId = Joi.number().positive().required();

// La diferencia con el PUT es que aki ningún campo es obligatorio
const schema = Joi.object().keys({
  brand: Joi.string().alphanum().min(3).max(20),
  model: Joi.string().alphanum().min(2).max(220),
  year: Joi
    .number()
    .integer()
    .positive()
    .min(1950)
    .max(new Date().getFullYear()),
  engine: Joi.string().valid('Diesel', 'Gasolina', 'Híbrido', 'Eléctrico'),
  cv: Joi.number().integer().positive().min(60).max(500)
});

async function patchCarById(req, res) {
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


    const updatedCar = {
      ...car,
      ...body,
    };


    await updateCar(carId, updatedCar);

    res.status(200).send({ ...updatedCar });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = patchCarById;
