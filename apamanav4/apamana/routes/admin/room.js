const express = require('express');
const router = express.Router();

const roomController = require('../../controllers/admin/roomController');

router.get('/admin/room',roomController.list)
router.post('/admin/room/add',roomController.save);
router.get('/admin/room/delete/:id',roomController.delete);
router.get('/admin/room/update/:id',roomController.edit);
router.post('/admin/room/update/:id',roomController.update);
router.get('/admin/room/new',roomController.new);
module.exports = router;
