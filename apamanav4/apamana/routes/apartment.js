const express = require('express');
const router = express.Router();

const apartmentController = require('../controllers/apartmentController');
router.get('/apartment',apartmentController.list);
router.post('/apartment/add',apartmentController.save);
router.get('/apartment/delete/:id',apartmentController.delete);
router.get('/apartment/update/:id',apartmentController.edit);
router.post('/apartment/update/:id',apartmentController.update);
router.get('/apartment/new',apartmentController.new);

module.exports = router;
