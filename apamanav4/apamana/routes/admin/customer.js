const express = require('express');
const router = express.Router();

const customerController = require('../../controllers/admin/customerController');
router.get('/admin/customer',customerController.list);
router.post('/admin/customer/add',customerController.save);
router.get('/admin/customer/delete/:id',customerController.delete);
router.get('/admin/customer/update/:id',customerController.edit);
router.post('/admin/customer/update/:id',customerController.update);
router.get('/admin/customer/new',customerController.new);

module.exports = router;
