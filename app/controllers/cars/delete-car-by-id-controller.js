'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

const { findCarById, removeCarById } = require('../../repositories/cars-repository');
const schema = Joi.number().integer().positive().required();

async function deleteCarById(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);

    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Coche no existe');
    }
    await removeCarById(carId);


    res.status(204);
    res.end();
    // Ejemplos de 2 respuestas distintas
    //res.status(204).end();
    //res.status(200).send({message:`${idCar} borrado correctamente!`});
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteCarById;