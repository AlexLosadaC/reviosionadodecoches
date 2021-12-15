'use strict';
const createJsonError = require('../../errors/create-json-error');
const { findAllBrands } = require('../../repositories/cars-repository');

async function getBrands(req, res) {
  try {
    const brands = await findAllBrands();

    res.status(200);
    res.send({ data: brands });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBrands;