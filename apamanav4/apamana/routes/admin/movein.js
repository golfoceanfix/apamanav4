const express = require('express');
const router = express.Router();

const moveinController = require('../../controllers/admin/moveinController');

router.get('/admin/movein',moveinController.list)
router.post('/admin/movein/add',moveinController.save);
router.get('/admin/movein/delete/:id',moveinController.delete);
router.get('/admin/movein/update/:id',moveinController.edit);
router.post('/admin/movein/update/:id',moveinController.update);
router.get('/admin/movein/new',moveinController.new);
module.exports = router;
