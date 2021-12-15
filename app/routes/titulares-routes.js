'use strict';

const express = require("express");
const router = express.Router();

const getTitularesElPais = require('../controllers/titulares/get-titulares-elpais-controller');
const getTitularesMarca = require('../controllers/titulares/get-titulares-marca-controller');

router.route('/elpais').get(getTitularesElPais);
router.route('/marca').get(getTitularesMarca);

module.exports = router;