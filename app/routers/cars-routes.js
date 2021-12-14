"use strict";

const express = require("express");
const router = express.Router();
const getCars = require("../controllers/cars/get-cars-controller");
const createReviewByCarId = require("../controllers/cars/create-review-by-car-id-controller");
const getCarById = require("../controllers/cars/cars-getById");
const uploadCarImageById = require("../controllers/cars/cars-upload-image-by-id-controller");
const getAverageRatingByCarId = require("../controllers/cars/get-reviews-by-car-id");
const updateCarById = require("../controllers/cars/update-cars-by-id");
const validateAuth = require("../middlewares/validate-auth");

router.route("/").get(getCars);
router.route("/:id").get(getCarById);
router.route("/:carId/reviews").get(getCarById);
router.route("/:carId/rating").get(getAverageRatingByCarId);

router.route("/:carId/reviews").all(validateAuth).post(createReviewByCarId);
router.route("/:carId/images").all(validateAuth).post(uploadCarImageById);
router.route("/:carId").all(validateAuth).put(updateCarById);

module.exports = router;
