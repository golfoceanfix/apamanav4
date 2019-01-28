const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
router.get('/customer',customerController.list);
router.post('/customer/add',customerController.save);
router.get('/customer/delete/:id',customerController.delete);
router.get('/customer/update/:id',customerController.edit);
router.post('/customer/update/:id',customerController.update);
router.get('/customer/new',customerController.new);

module.exports = router;
