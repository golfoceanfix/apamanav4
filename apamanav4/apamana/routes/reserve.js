const express = require('express');
const router = express.Router();

const reserveController = require('../controllers/reserveController');
router.get('/reserve',reserveController.list);
router.post('/reserve/add',reserveController.save);
router.get('/reserve/delete/:id',reserveController.delete);
router.get('/reserve/update/:id',reserveController.edit);
router.post('/reserve/update/:id',reserveController.update);
router.get('/reserve/new',reserveController.new);

module.exports = router;
