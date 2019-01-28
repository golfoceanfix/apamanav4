const express = require('express');
const router = express.Router();

const roomtypeController = require('../controllers/roomtypeController');
router.get('/roomtype', roomtypeController.list);
router.get('/roomtype/new', roomtypeController.new);
router.post('/roomtype/add', roomtypeController.save);
router.get('/roomtype/delete/:id', roomtypeController.delete);
router.get('/roomtype/update/:id', roomtypeController.edit);
router.post('/roomtype/update/:id', roomtypeController.update);

module.exports = router;
