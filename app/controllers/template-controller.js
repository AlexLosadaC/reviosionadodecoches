'use strict';
const createJsonError = require('../errors/create-json-error');
// Require funcion BD
// SChema Joi

async function nombreFuncion(req, res) {
  try {
    //VALIDACION PARAMETROS ENTRADA
    //LLAMADA BASE DATOS
    // VALIDAR RESULTADO
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;