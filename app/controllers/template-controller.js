"use strict";

const createJsonError = require("../errors/create-json-errors");

async function nombreFuncion(req, res) {
  try {
    // validacion parametros de entrada
    //llamada base de datos
    //validar resultado
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;
