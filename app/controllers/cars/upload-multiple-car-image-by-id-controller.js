'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const uploadImage = require('../../helpers/upload-image');
const { isAdmin } = require('../../helpers/utils');
const { addImageByCarId } = require('../../repositories/car-images-repository');

const { HTTP_SERVER_DOMAIN, PATH_CARS_IMAGE } = process.env;

const schema = Joi.number().positive().integer().required();

async function uploadMutipleCarImages(req, res) {
  try {
    const { carId } = req.params;
    //Validamos del carId
    await schema.validateAsync(carId);
    // Obtenemos el id del JWT
    const { role } = req.auth;
    // Validamos que sea adminstador para subir imagenes
    isAdmin(role);
    // Las imagenes vienen dentro de la cabecera req en el objeto files
    // Comprobamos q existe alguna imagen
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No se ha seleccionado ningún fichero');
    }

    const { imageCar } = files;


    const uploadImages = await Promise.all(imageCar.map(async (imgCar) => {
      const { data } = imgCar;
      const processImage = await uploadImage({
        imageData: data,
        destination: `${PATH_CARS_IMAGE}/${carId}`,
        width: 600,
        height: 600,
        codImage: carId,
      });

      await addImageByCarId(carId, processImage);

      return ({ image: `${HTTP_SERVER_DOMAIN}/${PATH_CARS_IMAGE}/${carId}/${processImage}` });
    }));

    res.status(201);
    res.send({ data: uploadImages });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadMutipleCarImages;