const express = require('express');
const router = express.Router();
const utilityController = require('../../controllers/admin/utilityController');

router.get('/admin/utility',utilityController.list);
router.get('/admin/utility/new', utilityController.new);
router.post('/admin/utility/add', utilityController.save);
router.get('/admin/utility/delete/:id',utilityController.delete);
router.get('/admin/utility/update/:id',utilityController.edit);
router.post('/admin/utility/update/:id',utilityController.update);


module.exports = router;
