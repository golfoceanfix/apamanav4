const express = require('express');
const router = express.Router();

const moveoutController = require('../../controllers/admin/moveoutController');

router.get('/admin/moveout',moveoutController.list)
router.post('/admin/moveout/add',moveoutController.save);
router.get('/admin/moveout/delete/:id',moveoutController.delete);
router.get('/admin/moveout/update/:id',moveoutController.edit);
router.post('/admin/moveout/update/:id',moveoutController.update);
router.get('/admin/moveout/new',moveoutController.new);
module.exports = router;
