const express = require('express');
const router = express.Router();

const payController = require('../../controllers/admin/payController');

router.get('/admin/pay',payController.list)
router.post('/admin/pay/add',payController.save);
router.get('/admin/pay/delete/:id',payController.delete);
router.get('/admin/pay/update/:id',payController.edit);
router.post('/admin/pay/update/:id',payController.update);
router.get('/admin/pay/new',payController.new);
router.post('/admin/pay/success/:id',payController.pay);
module.exports = router;
