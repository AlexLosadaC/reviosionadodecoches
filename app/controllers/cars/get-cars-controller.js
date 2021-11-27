"use strict";

const createJsonError = require("../../errors/create-json-errors");

const { findAllCars } = require("../../repositories/cars-repository");

async function getCars(req, res) {
  try {
    const cars = await findAllCars();

    res.status(200);
    res.send({ data: cars });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCars;
