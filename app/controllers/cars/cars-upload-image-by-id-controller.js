"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const uploadImage = require("../../images/upload-image");
const { isAdmin } = require("../../helpers/utils");
const { addImageByCarId } = require("../../repositories/cars-repository");
const schema = Joi.number().positive().integer().require();

async function uploadCarImageById(req, res, next) {
  try {
    const { carId } = req.params;

    await schema.validateAsync(carId);
    const { role } = req.auth;
    isAdmin(role);

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    const { imageCar } = files;
    if (!imageCar) {
      throwJsonError(400, "Fichero subido no válido");
    }

    if (!imageCar.mimetype.startsWith("image")) {
      throwJsonError(400, "Formato no válido");
    }
    const { PATH_USER_IMAGE } = process.env;

    await uploadImage({
      imageData: imageCar.data,
      destination: `&{PATH_CAR_IMAGE}/&{carId}`,
      width: 300,
      height: 300,
      codImage: carId,
    });

    await addImageByCarId(carId, carImage);

    res.status(200).send({ carID, carImage });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadCarImageById;
