"use strict";

const throwJsonError = require("../errors/throw-json-error");

function isAdmin(role) {
  if (role !== "admin") {
    throwJsonError(401, "No tiene permiso para realizar esta acción");
  }
}
module.exports = { isAdmin };
