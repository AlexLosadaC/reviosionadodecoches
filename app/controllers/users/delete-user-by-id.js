"use strict";

const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const { removeUserById } = require("../../repositories/users-repository");
const isAdmin = require("../../helpers/utils");
const Joi = require("joi");

const schema = Joi.number().positive().required();

async function deleteUserById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      throwJsonError(400, "Ususario no existe");
    }
    if (user.role === "admin") {
      throwJsonError(403, "No tiene permiso para realizar es acción");
    }
    await removeUserById(id);

    res.status(204).send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteUserById;
