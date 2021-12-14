"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");

const schemaId = Joi.number().positive().integer().required();
const schema = Joi.object().keys({
  brand: Joi.string().min(3).max(20).required(),
  model: Joi.string().min(2).max(220).required(),
  año: Joi.number()
    .integer()
    .positive()
    .min(1950)
    .max(new Date().getFullYear()),
  engine: Joi.string().valid("Diesel", "Gasolina", "Híbrido", "Eléctrico"),
  cv: Joi.number().integer().positive().min(40).max(600),
});

async function updateCarById(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);
    const { carId } = req.params;

    await schemaId.validateAsync(carId);

    const car = await findcarById(carId);
    if (!car) {
      throwJsonError(400, "coche no existente");
    }

    const { body } = req;
    await schema.validateAsync(body);
    await updateCar(carId, body);
    const { brand, model } = body;

    res.status(200).send({ message: `Coche ${brand} ${model} actualizado` });
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = updateCarById;
