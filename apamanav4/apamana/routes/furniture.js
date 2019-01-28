const express = require('express');
const router = express.Router();

const furnitureController = require('../controllers/furnitureController');
router.get('/furniture',furnitureController.list);
router.get('/furniture/new',furnitureController.new);
router.post('/furniture/add',furnitureController.save);
router.get('/furniture/delete/:id',furnitureController.delete);
router.get('/furniture/update/:id',furnitureController.edit);
router.post('/furniture/update/:id',furnitureController.update);

module.exports = router;
