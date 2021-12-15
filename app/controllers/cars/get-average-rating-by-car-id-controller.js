'use strict';

const Joi = require('joi');
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require('../../errors/throw-json-error');
const { findCarById } = require('../../repositories/cars-repository');
const { getRating } = require('../../repositories/reviews-repository');
const schema = Joi.number().positive().integer().required();

async function getAverageRatingByCarId(req, res) {
  try {

    const { carId } = req.params;

    await schema.validateAsync(carId);

    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, 'Coche no existe');
    }

    const rating = await getRating(carId);

    res.status(200);
    res.send(rating);
    //res.send({ media, numValoraciones });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAverageRatingByCarId;