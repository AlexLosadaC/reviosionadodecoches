'use strict';

const Joi = require('joi');
const { isAdmin } = require('../../helpers/utils');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findUserById, removeUserById } = require('../../repositories/users-repository');

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {

    const { role } = req.auth;

    isAdmin(role);


    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      throwJsonError(400, 'Usuario no existe');
    }

    await removeUserById(id);

    res.status(204).send();
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;