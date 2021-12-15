'use strict';
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { sendMailCorrectValidation } = require('../../helpers/mail-smtp');
const { activateUser, getUserByVerificationCode } = require('../../repositories/users-repository');
//api/v1/users/activation?code=ad;fadfasdf
async function validateUser(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      throwJsonError(400, 'Código no válido');
    }
    const isActivated = await activateUser(code);
    if (!isActivated) {
      throwJsonError(400, 'Código no válido');
    }
    const user = await getUserByVerificationCode(code);
    const { name, email } = user;
    await sendMailCorrectValidation(name, email);
    res.status(200);
    res.send({ message: 'Cuenta activada correctamente' });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = validateUser;