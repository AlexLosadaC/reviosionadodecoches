'use strict';

const Joi = require('joi');
const { removeReviewById } = require('../../repositories/reviews-repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');

const schema = Joi.number().positive().required();

async function deleteReviewById(req, res) {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);

    const review = await reviewsRepository.findReviewById(id);
    if (!review) {
      const error = new Error('Review no existe');
      error.status = 400;
      throw error;
    }

    const { role } = req.auth;
    const { user_id: userId } = review;
    if (!role === 'admin' || !userId === id) {
      throwJsonError(403, 'No tienes permisos para realizar esta acción');
    }

    await reviewsRepository.removeReviewById(id);

    res.status(200);
    res.send({ message: `Review id:${id} borrada` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteReviewById;
