const express = require('express');
const router = express.Router();

const listbillController = require('../controllers/listbillController');

router.get('/listbill',listbillController.list)
router.post('/listbill/add',listbillController.save);
router.get('/listbill/delete/:id',listbillController.delete);
router.get('/listbill/update/:id',listbillController.edit);
router.post('/listbill/update/:id',listbillController.update);
router.get('/listbill/new',listbillController.new);
module.exports = router;
