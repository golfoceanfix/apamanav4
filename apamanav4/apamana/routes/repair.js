const express = require('express');
const router = express.Router();

const repairController = require('../controllers/repairController');

router.get('/repair',repairController.list)
router.post('/repair/add',repairController.save);
router.get('/repair/delete/:id',repairController.delete);
router.get('/repair/update/:id',repairController.edit);
router.post('/repair/update/:id',repairController.update);
router.get('/repair/new',repairController.new);
router.post('/repair/success/:id',repairController.repair);
module.exports = router;
