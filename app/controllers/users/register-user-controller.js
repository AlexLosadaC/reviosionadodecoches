'use strict';
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error.js');
const {
  createUser,
  findUserByEmail,
} = require('../../repositories/users-repository');
const { sendMailRegister } = require('../../helpers/mail-smtp');

const { HTTP_SERVER_DOMAIN } = process.env;

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref('password'),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {

      throwJsonError(409, 'Ya existe un usuario con ese email');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const verificationCode = randomstring.generate(64);

    const userDB = { name, email, passwordHash, verificationCode };

    const userId = await createUser(userDB);

    await sendMailRegister(name, email, verificationCode);


    const activationLink = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?code=${verificationCode}`;

    res.status(201);

    res.send({
      id: userId,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;