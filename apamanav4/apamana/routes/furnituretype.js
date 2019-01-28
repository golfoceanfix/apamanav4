const express = require('express');
const router = express.Router();

const furnituretypeController = require('../controllers/furnituretypeController');

router.get('/furnituretype',furnituretypeController.list);
router.post('/furnituretype/add',furnituretypeController.save);
router.get('/furnituretype/delete/:id',furnituretypeController.delete);
router.get('/furnituretype/update/:id',furnituretypeController.edit);
router.post('/furnituretype/update/:id',furnituretypeController.update);
router.get('/furnituretype/new',furnituretypeController.new);

module.exports = router;
