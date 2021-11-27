"use strict";

function createJsonError(error, res) {
  const { status, message } = error;
  res.status(error.status);
  res.send({
    error: message,
  });
}

module.exports = createJsonError;
