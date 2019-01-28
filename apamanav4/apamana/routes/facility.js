const express = require('express');
const router = express.Router();

const facilityController = require('../controllers/facilityController');
router.get('/facility', facilityController.list);
router.get('/facility/new', facilityController.new);
router.post('/facility/add', facilityController.save);
router.get('/facility/delete/:id', facilityController.delete);
router.get('/facility/update/:id', facilityController.edit);
router.post('/facility/update/:id', facilityController.update);

module.exports = router;
