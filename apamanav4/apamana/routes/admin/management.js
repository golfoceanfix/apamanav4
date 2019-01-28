express = require('express');
const router = express.Router();

const managementController = require('../../controllers/admin/managementController');
router.get('/admin/management', managementController.list);
router.get('/admin/management/new', managementController.new);
router.post('/admin/management/add', managementController.save);
router.get('/admin/management/delete/:id', managementController.delete);
router.get('/admin/management/update/:id', managementController.edit);
router.post('/admin/management/update/:id', managementController.update);

module.exports = router;
