const express = require('express');
const router = express.Router();

const userController = require('../../controllers/admin/userController');
router.get('/admin/user', userController.list);
router.get('/admin/user/new', userController.new);
router.post('/admin/user/add', userController.save);
router.get('/admin/user/delete/:id', userController.delete);
router.get('/admin/user/update/:id', userController.edit);
router.post('/admin/user/update/:id', userController.update);

module.exports = router;
