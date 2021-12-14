"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const { getRating } = require("../../repositories/reviews-repository");
const schema = Joi.number().positive().integer().required();

async function getAverageRatingByCarId(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const car = await findcarById(carId);
    if (!car) {
      throwJsonError(400, "No existe un coche con ese id");
    }
    const rating = await getRating(carId);

    res.status(200).send(rating);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAverageRatingByCarId;
