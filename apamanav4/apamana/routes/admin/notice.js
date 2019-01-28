const express = require('express');
const router = express.Router();
const noticeController = require('../../controllers/admin/noticeController');

router.get('/admin/notice',noticeController.list);
router.get('/admin/notice/new', noticeController.new);
router.post('/admin/notice/add', noticeController.save);
router.get('/admin/notice/delete/:id',noticeController.delete);
router.get('/admin/notice/update/:id',noticeController.edit);
router.post('/admin/notice/update/:id',noticeController.update);
router.post('/admin/moveout/success/:id',noticeController.moveout);

module.exports = router;
