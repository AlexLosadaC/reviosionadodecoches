"use strict";

const bcrypt = require("bcryptjs");
//const cryptoRandomString = require("crypto-random-string");
const randomstring = require("randomstring");
const Joi = require("joi");
const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const sendMailRegister = require("../../helpers/mail-smtp");
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");
const { sendMailRegister } = require("../../helpers/mail-smtp");
const schema = Joi.objects().keys({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref("password"),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {
      // const error = new Error("Ya existe un usuario con ese email");
      // error.status = 400;
      // throw error;
      throwJsonError(400, "ya existe un usuario con ese email");
    }

    //crear el hash del password
    const passwordHash = await bcrypt.hash(password, 12);
    //crear el verificationCode
    const verificationCode = randomstring.generate(64);
    //crear Object user con los campos
    const userDB = { name, enail, passwordHash, verificationCode };
    //llamamos a la base de datos - createUser
    const userId = await createUser(userDB);
    //enviar mail de verificacion de cuenta
    // console.log(
    //   `http://localhost:3000/api/vi/users/activation?code=${verificationCode}`
    // );
    await sendMailRegister(name, email);
    res.status(201);
    res.send({ id: userId });
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = registerUser;

//hackaboss5@dsoutoweb.com - U79_)J?NYxRCC?P
