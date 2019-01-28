const express = require('express');
const router = express.Router();

const apartmentController = require('../../controllers/admin/apartmentController');
router.get('/admin/apartment',apartmentController.list);
router.post('/admin/apartment/add',apartmentController.save);
router.get('/admin/apartment/delete/:id',apartmentController.delete);
router.get('/admin/apartment/update/:id',apartmentController.edit);
router.post('/admin/apartment/update/:id',apartmentController.update);
router.get('/admin/apartment/new',apartmentController.new);

module.exports = router;
