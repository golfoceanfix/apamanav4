const express = require('express');
const router = express.Router();

const filterController = require('../controllers/filterController');
router.get('/filter', filterController.list);


module.exports = router;
