'use strict';

const express = require('express');

const validateAuth = require('../middlewares/validate-auth');
const deleteReviewById = require('../controllers/reviews/delete-review-by-id-controller');

const router = express.Router();

//Privadas
router
  .route('/:id')
  .all(validateAuth)
  .delete(deleteReviewById);

module.exports = router;