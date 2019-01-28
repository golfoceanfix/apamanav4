const express = require('express');
const router = express.Router();

const contractController = require('../../controllers/admin/contractController');

router.get('/admin/contract',contractController.list)
router.post('/admin/contract/add',contractController.save);
router.get('/admin/contract/delete/:id',contractController.delete);
router.get('/admin/contract/update/:id',contractController.edit);
router.post('/admin/contract/update/:id',contractController.update);
router.get('/admin/contract/new',contractController.new);
module.exports = router;
