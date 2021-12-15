'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const {
  addVerificationCode,
  findUserByEmail,
  findUserById,
  udpateUserById,
} = require('../../repositories/users-repository');
const createJsonError = require('../../errors/create-json-error');
const { sendMailRegister } = require('../../helpers/mail-smtp');
const throwJsonError = require('../../errors/throw-json-error');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref('password'),
});

async function updateUser(req, res) {
  try {
    const { id } = req.auth;


    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password, repeatPassword } = req.body;

    const userById = await findUserById(id);
    const user = await findUserByEmail(email);

    if (user && user.id !== id) {
      throwJsonError(409, 'Ya existe un usuario con ese email');
    }

    let updatedPassword = userById.password;
    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      updatedPassword = passwordHash;
    }

    await udpateUserById({ id, name, email, password: updatedPassword });

    if (email !== userById.email) {
      const verificationCode = randomstring.generate(64);
      await addVerificationCode(id, verificationCode);
      await sendMailRegister(name, email, verificationCode);
    }

    res.send({ id, name, email, role: userById.role });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateUser;
