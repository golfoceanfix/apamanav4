const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.get('/notice',noticeController.list);
router.get('/notice/new', noticeController.new);
router.post('/notice/add', noticeController.save);
router.get('/notice/delete/:id',noticeController.delete);
router.get('/notice/update/:id',noticeController.edit);
router.post('/notice/update/:id',noticeController.update);

module.exports = router;
