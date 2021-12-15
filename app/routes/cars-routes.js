'use strict';

const express = require('express');
const router = express.Router();
const createCar = require('../controllers/cars/create-car-controller');
const createReviewByCarId = require('../controllers/cars/create-review-by-car-id-controller');
const deleteCarById = require('../controllers/cars/delete-car-by-id-controller');
const getAverageRatingByCarId = require('../controllers/cars/get-average-rating-by-car-id-controller');
const getCars = require('../controllers/cars/get-cars-controller');
const getCarById = require('../controllers/cars/get-car-by-id-controller');
const getCarImagesById = require('../controllers/cars/get-car-images-by-id-controller');
const getReviewsByCarId = require('../controllers/cars/get-reviews-by-car-id-controller');
const patchCarById = require('../controllers/cars/patch-car-by-id-controller');
const updateCarById = require('../controllers/cars/update-car-by-id-controller');
const uploadCarImageById = require('../controllers/cars/upload-car-image-by-id-controller');
const uploadMutipleCarImages = require('../controllers/cars/upload-multiple-car-image-by-id-controller');
const validateAuth = require('../middlewares/validate-auth');

// Endpoints Públicos
router.route('/').get(getCars);
router.route('/:id').get(getCarById);
router.route('/:carId/images').get(getCarImagesById);
router.route('/:carId/reviews').get(getReviewsByCarId);
router.route('/:carId/rating').get(getAverageRatingByCarId);
// Endpoints Privados
router.route('/').all(validateAuth).post(createCar);
router.route('/:carId/reviews').all(validateAuth).post(createReviewByCarId);
router.route('/:carId/image').all(validateAuth).post(uploadCarImageById);
router.route('/:carId/images').all(validateAuth).post(uploadMutipleCarImages);
router
  .route('/:carId')
  .all(validateAuth)
  .put(updateCarById)
  .patch(patchCarById)
  .delete(deleteCarById);

module.exports = router;