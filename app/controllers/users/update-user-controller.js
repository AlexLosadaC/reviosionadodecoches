"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findUserById,
  findUserByEmail,
  updateVerificationCode,
} = require("../../controllers/users/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(3).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUserById(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { name, email, password, repeatPassword } = body;
    await schema.validateAsync(body);

    const userLogged = await findUserById(id);

    const userExist = await findUserByEmail(email);

    if (userExist && userExist != id) {
      throwJsonError(409, "Ya existe un usuario con ese email");
    }
    let updatePassword = userLogged.password;

    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      updatePassword = passwordHash;
    }
    await updateUserById({ id, name, email, password: updatePassword });

    if (email !== userLogged.email) {
      const verificationCode = randomstring.generate(64);
      await updateVerificationCode(id, verificationCode);
      await sendEmailRegister(name, email, verificationCode);
    }
    res.status(200).send({ message: `Usuario actualizado` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateUserById;
