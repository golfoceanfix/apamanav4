const express = require('express');
const router = express.Router();

const furnituretypeController = require('../../controllers/admin/furnituretypeController');

router.get('/admin/furnituretype',furnituretypeController.list);
router.post('/admin/furnituretype/add',furnituretypeController.save);
router.get('/admin/furnituretype/delete/:id',furnituretypeController.delete);
router.get('/admin/furnituretype/update/:id',furnituretypeController.edit);
router.post('/admin/furnituretype/update/:id',furnituretypeController.update);
router.get('/admin/furnituretype/new',furnituretypeController.new);

module.exports = router;
