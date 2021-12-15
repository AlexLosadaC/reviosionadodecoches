'use strict';
const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findAllImageByCarId, removePrincipalByCarId } = require('../../repositories/car-images-repository');

const { HTTP_SERVER_DOMAIN, PATH_CARS_IMAGE } = process.env;

const schema = Joi.number().integer().positive().required();

async function getCarImagesById(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const carImages = await findAllImageByCarId(carId);
    if (!carImages) {
      throwJsonError(400, 'Id no válido');
    }

    const mapperCarImages = carImages.map(imgCar => {

      const { name, principal } = imgCar;
      const imgUrl = `${HTTP_SERVER_DOMAIN}/${PATH_CARS_IMAGE}/${carId}/${name}`;
      return {
        image: imgUrl,
        principal,
      }
    });

    res.status(200);
    res.send({ data: mapperCarImages });
  } catch(error) {
    createJsonError(error, res);
  }
}

module.exports = getCarImagesById;
