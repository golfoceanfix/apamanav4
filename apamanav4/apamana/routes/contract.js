const express = require('express');
const router = express.Router();

const contractController = require('../controllers/contractController');

router.get('/contract',contractController.list)
router.post('/contract/add',contractController.save);
router.get('/contract/delete/:id',contractController.delete);
router.get('/contract/update/:id',contractController.edit);
router.post('/contract/update/:id',contractController.update);
router.get('/contract/new',contractController.new);
module.exports = router;
