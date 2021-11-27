"use strict";
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const { findCarById } = require("../../repositories/cars-repository");

function getCarById(req, res) {
  try {
    const { id } = req.params;
    const car = findCarById(id);
    if (car.lenght === 0) {
      throwJsonError(400, "parámetro no válido");
    }
    res.status(200);
    res.send(car);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarById;
