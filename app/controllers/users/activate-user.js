"use strict";

const createJsonError = require("../../errors/create-json-errors");
const throwJsonError = require("../../errors/throw-json-error");
const {
  sendMailCorrectValidation,
} = require("../controllers/users/register-user-controller");
const {
  activateUser,
  getUserByVerificationCode,
} = require("../../repositories/users-repository");
const router = require("../../routers/cars-routes");

router.Route("/").post(registerUser);
router.Route("/activation").get(validateUser);

async function validateUser(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      throwJsonError(400, "Código no válido");
    }
    const isActivate = await activateUser(code);
    if (!isActivated) {
      throwJsonError(400, "Código no válido");
    }
    const user = await getUserByVerificationCode(code);
    const { name, email } = user;
    await sendMailCorrectValidation(name, email);
    res.status(200);
    res.send({ message: "Cuenta activada correctamente" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = validateUser;
