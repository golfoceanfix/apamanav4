const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

router.get('/utility',utilityController.list);
router.get('/utility/new', utilityController.new);
router.post('/utility/add', utilityController.save);
router.get('/utility/delete/:id',utilityController.delete);
router.get('/utility/update/:id',utilityController.edit);
router.post('/utility/update/:id',utilityController.update);


module.exports = router;
