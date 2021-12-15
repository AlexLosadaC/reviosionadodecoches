'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const uploadImage = require('../../helpers/upload-image');
const { isAdmin } = require('../../helpers/utils');
const { addImageByCarId, removePrincipalByCarId } = require('../../repositories/car-images-repository');

const { HTTP_SERVER_DOMAIN, PATH_CARS_IMAGE } = process.env;

const schema = Joi.number().positive().integer().required();
const schemaPrincipal = Joi.boolean();

async function uploadCarImageById(req, res) {
  try {
    const { carId } = req.params;

    await schema.validateAsync(carId);

    const { role } = req.auth;

    isAdmin(role);


    const { body } = req;
    const { principal } = body;
    await schemaPrincipal.validateAsync(principal);

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No se ha seleccionado ningún fichero');
    }

    const { imageCar } = files;
    if (!imageCar) {
      throwJsonError(400, 'Fichero subido no válido');
    }
    if (!imageCar.mimetype.startsWith('image')) {
      throwJsonError(400, 'Formato no valido');
    }

    const processImage = await uploadImage({
      imageData: imageCar.data,
      destination: `${PATH_CARS_IMAGE}/${carId}`,
      width: 600,
      height: 600,
      codImage: carId,
    });
    if (principal) {
      await removePrincipalByCarId(carId);
    }
    await addImageByCarId(carId, processImage, principal);

    res.status(201);
    res.send({ image: `${HTTP_SERVER_DOMAIN}/${PATH_CARS_IMAGE}/${carId}/${processImage}` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadCarImageById;