'use strict';

const Joi = require('joi');
const { findUserById } = require('../../repositories/users-repository');
const createJsonError = require('../../errors/create-json-error');
const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

async function getUserProfile(req, res) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { id } = req.auth;
    const user = await findUserById(id);
    const { name, email, role, createdAt } = user;

    const image = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${user.image}`;

    res.status(200);
    res.send({ name, email, role, createdAt, image });
    //res.send({ ...user, image });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserProfile;

