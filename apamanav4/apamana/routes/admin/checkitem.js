const express = require('express');
const router = express.Router();

const checkitemController = require('../../controllers/admin/checkitemController');

router.get('/admin/checkitem',checkitemController.list)
router.post('/admin/checkitem/add',checkitemController.save);
router.get('/admin/checkitem/delete/:id',checkitemController.delete);
router.get('/admin/checkitem/update/:id',checkitemController.edit);
router.post('/admin/checkitem/update/:id',checkitemController.update);
router.get('/admin/checkitem/new',checkitemController.new);
module.exports = router;
