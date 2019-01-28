const express = require('express');
const router = express.Router();

const repairController = require('../../controllers/admin/repairController');

router.get('/admin/repair',repairController.list)
router.post('/admin/repair/add',repairController.save);
router.get('/admin/repair/delete/:id',repairController.delete);
router.get('/admin/repair/update/:id',repairController.edit);
router.post('/admin/repair/update/:id',repairController.update);
router.get('/admin/repair/new',repairController.new);
router.post('/admin/repair/success/:id',repairController.repair);
module.exports = router;
