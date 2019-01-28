const express = require('express');
const router = express.Router();

const roomtypeController = require('../../controllers/admin/roomtypeController');
router.get('/admin/roomtype', roomtypeController.list);
router.get('/admin/roomtype/new', roomtypeController.new);
router.post('/admin/roomtype/add', roomtypeController.save);
router.get('/admin/roomtype/delete/:id', roomtypeController.delete);
router.get('/admin/roomtype/update/:id', roomtypeController.edit);
router.post('/admin/roomtype/update/:id', roomtypeController.update);

module.exports = router;
