'use strict';

const express = require('express');
const router = express.Router();
const deleteUserById = require('../controllers/users/delete-user-by-id-controller');
const validateUser = require('../controllers/users/activate-user-controller');
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const getUserProfile = require('../controllers/users/get-user-profile-controller');
const getUserReviewsById = require('../controllers/users/get-user-reviews-by-id-controller');
const getUsers = require('../controllers/users/get-users-controller');
const randomUser = require('../controllers/users/random-user-controller');
const uploadImageProfile = require('../controllers/users/upload-image-profile-controller');
const updateUser = require('../controllers/users/update-user-controller');
const validateAuth = require('../middlewares/validate-auth');

// Todas las URLs serán con este formato /api/v1/users/...

// Endpoints Públicos
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

router.route('/random').get(randomUser);

// Endpoints Privados
router
  .route('/')
  .all(validateAuth)
  .get(getUsers)
  .put(updateUser);

router
  .route('/:id')
  .all(validateAuth)
  .delete(deleteUserById);

router
  .route('/:id/reviews')
  .all(validateAuth)
  .get(getUserReviewsById);

router
  .route('/profile')
  .all(validateAuth)
  .get(getUserProfile);

router
  .route('/upload')
  .all(validateAuth)
  .post(uploadImageProfile);

module.exports = router;