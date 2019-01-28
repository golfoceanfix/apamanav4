const express = require('express');
const router = express.Router();

const listbillController = require('../../controllers/admin/listbillController');

router.get('/admin/listbill',listbillController.list)
router.post('/admin/listbill/add',listbillController.save);
router.get('/admin/listbill/delete/:id',listbillController.delete);
router.get('/admin/listbill/update/:id',listbillController.edit);
router.post('/admin/listbill/update/:id',listbillController.update);
router.get('/admin/listbill/new',listbillController.new);
module.exports = router;
