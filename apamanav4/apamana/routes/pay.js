const express = require('express');
const router = express.Router();

const payController = require('../controllers/payController');

router.get('/pay',payController.list)
router.post('/pay/add',payController.save);
router.get('/pay/delete/:id',payController.delete);
router.get('/pay/update/:id',payController.edit);
router.post('/pay/update/:id',payController.update);
router.get('/pay/new',payController.new);
router.post('/pay/success/:id',payController.pay);
module.exports = router;
