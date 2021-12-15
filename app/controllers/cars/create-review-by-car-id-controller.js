'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { addReview } = require('../../repositories/reviews-repository');
const { findCarById } = require('../../repositories/cars-repository');

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  comment: Joi.string().min(5).max(255).required(),
  rating: Joi.number().integer().min(0).max(5).required(),
});

async function createReviewByCarId(req, res) {
  try {
    const { id } = req.auth;
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const { body } = req;
    await schemaBody.validateAsync(body);

    const car = findCarById(carId);
    if (!car) {
      throwJsonError(400, "Coche no existe");
    }
    const { comment, rating } = body;

    const reviewId = await addReview(id, carId, comment, rating);
    res.status(201);
    res.send({ reviewId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createReviewByCarId;
