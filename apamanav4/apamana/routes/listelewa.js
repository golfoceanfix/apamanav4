const express = require('express');
const router = express.Router();

const listelewaController = require('../controllers/listelewaController');
router.get('/listelewa',listelewaController.list);
router.get('/listelewa/show',listelewaController.list2);
router.get('/listelewa/printbill',listelewaController.list3);


module.exports = router;
