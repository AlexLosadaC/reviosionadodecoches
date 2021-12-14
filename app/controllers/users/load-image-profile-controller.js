"use strict";

const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findUserById,
  uploaduserImage,
} = require("../../repositories/users-repository");
const { HTTP_SERVER, PATH_USER_IMAGE } = require(".env");
const validExtension = [".jpeg", ".jpg", ".png"];
async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    const { profileImage } = files;

    const { name } = profileImage;
    const extension = path.extname(profileImage.name);
    if (!validExtension.includes(extension)) {
      throwJsonError(400, "Formato no válido");
    }

    const user = await findUserById(id);
    const { image } = user;

    const pathProfileImage = `${__dirname}/${PATH_USER_IMAGE}`;
    if (!image) {
      fs.unlink(`${pathProfileImage}/${image}`, () => {
        console.log("imagen borrada correctamente");
      });
    }

    const randomName = randomstring.generate(10);
    const imageName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imageName}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imageName);

      res
        .status(201)
        .send({ url: `${HTTP_SERVER}/${PATH_USER_IMAGE}/${imageName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfile;
