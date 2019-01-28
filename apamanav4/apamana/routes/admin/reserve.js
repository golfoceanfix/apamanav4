const express = require('express');
const router = express.Router();

const reserveController = require('../../controllers/admin/reserveController');
router.get('/admin/reserve',reserveController.list);
router.post('/admin/reserve/add',reserveController.save);
router.get('/admin/reserve/delete/:id',reserveController.delete);
router.get('/admin/reserve/update/:id',reserveController.edit);
router.post('/admin/reserve/update/:id',reserveController.update);
router.get('/admin/reserve/new',reserveController.new);

module.exports = router;
