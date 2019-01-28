const express = require('express');
const router = express.Router();

const facilityController = require('../../controllers/admin/facilityController');
router.get('/admin/facility', facilityController.list);
router.get('/admin/facility/new', facilityController.new);
router.post('/admin/facility/add', facilityController.save);
router.get('/admin/facility/delete/:id', facilityController.delete);
router.get('/admin/facility/update/:id', facilityController.edit);
router.post('/admin/facility/update/:id', facilityController.update);

module.exports = router;
