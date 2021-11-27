"use strict";

const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/register-user-controller");

router.route("/").post(registerUser);

module.exports = router;

//endpoint Públicos
//POST api/v1/users = registerUser
//POST api/v1/users/login
//POST api/v1/users/activation = activar usuario
//endpoint Privados
//GET api/v1/users <== solo admin
//GET api/v1/users/:id <== solo propietario
//PUT api/v1/users/:id
//PUT api/v1/users/:id/avatar
//DELETE api/v1/users/:id
