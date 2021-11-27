"use strict";

const express = require("express");
const router = express.Router();
const getCars = require("../controllers/cars/get-cars-controller");
const getCarById = require("../controllers/cars/cars-getById");

router.route("/").get(getCars);
router.route("/:id").get(getCarById);

module.exports = router;
