const express = require('express');
const router = express.Router();

const localadminController = require('../../controllers/admin/localadminController');
router.get('/admin/localadmin',localadminController.list);
router.post('/admin/localadmin/add',localadminController.save);
router.get('/admin/localadmin/delete/:id',localadminController.delete);
router.get('/admin/localadmin/update/:id',localadminController.edit);
router.post('/admin/localadmin/update/:id',localadminController.update);
router.get('/admin/localadmin/new',localadminController.new);

module.exports = router;
