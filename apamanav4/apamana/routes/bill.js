const express = require('express');
const router = express.Router();

const billController = require('../controllers/billController');

router.get('/bill',billController.list)
router.post('/bill/add',billController.save)
router.get('/bill/delete/:id',billController.delete);
router.get('/bill/update/:id',billController.edit);
router.post('/bill/update/:id',billController.update);
router.get('/bill/new',billController.new);
module.exports = router;
