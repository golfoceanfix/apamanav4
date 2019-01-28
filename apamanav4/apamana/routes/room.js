const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');

router.get('/room',roomController.list)
router.post('/room/add',roomController.save);
router.get('/room/delete/:id',roomController.delete);
router.get('/room/update/:id',roomController.edit);
router.post('/room/update/:id',roomController.update);
router.get('/room/new',roomController.new);
module.exports = router;
