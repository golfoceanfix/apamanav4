const express = require('express');
const router = express.Router();

const furnitureController = require('../../controllers/admin/furnitureController');
router.get('/admin/furniture',furnitureController.list);
router.get('/admin/furniture/new',furnitureController.new);
router.post('/admin/furniture/add',furnitureController.save);
router.get('/admin/furniture/delete/:id',furnitureController.delete);
router.get('/admin/furniture/update/:id',furnitureController.edit);
router.post('/admin/furniture/update/:id',furnitureController.update);

module.exports = router;
