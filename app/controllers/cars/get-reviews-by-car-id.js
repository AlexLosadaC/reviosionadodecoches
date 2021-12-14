"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const { findCarById } = require("../../repositories/cars-repository");
const { findReviewsByCarId } = require("../../repositories/reviews-repository");
const schema = Joi.number().positive().required();

async function getReviewsByCarId(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, "El coche no existe");
    }
    const reviews = await findReviewsByCarId(carId);
    res.status(200);
    res.send(reviews);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getReviewsByCarId;
