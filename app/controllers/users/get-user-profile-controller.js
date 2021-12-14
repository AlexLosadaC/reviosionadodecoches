"use strict";

const createJsonError = require("../../errors/create-json-errors");
const { findUserByID } = require("../../repositories/users-repository");
async function getUserProfile(req, res) {
  try {
    const { id } = req.auth;
    const user = await findUserByID(id);
    const { name, email, createAt } = user;
    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserProfile;
