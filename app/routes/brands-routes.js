'use strict';

const express = require('express');
const router = express.Router();
const getBrands = require('../controllers/brands/get-brands-controller');

// Endpoint Públicos
router.route('/').get(getBrands);

module.exports = router;