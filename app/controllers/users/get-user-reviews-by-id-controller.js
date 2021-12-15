'use strict';

const Joi = require('joi');
const { findUserById } = require('../../repositories/users-repository');
const { findReviewsByUserId } = require('../../repositories/reviews-repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { isAdmin } = require('../../helpers/utils');

const schema = Joi.number().positive();

async function getUserReviewsById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      throwJsonError(400, 'Usuario no existe');
    }
    const reviews = await findReviewsByUserId(id);

    res.send(reviews);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserReviewsById;