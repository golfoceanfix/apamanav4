const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
router.get('/user', userController.list);
router.get('/user/new', userController.new);
router.post('/user/add', userController.save);
router.get('/user/delete/:id', userController.delete);
router.get('/user/update/:id', userController.edit);
router.post('/user/update/:id', userController.update);

module.exports = router;
