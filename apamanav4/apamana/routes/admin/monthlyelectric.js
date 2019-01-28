const express = require('express');
const router = express.Router();

const monthlyelectricController = require('../../controllers/admin/monthlyelectricController');
router.get('/admin/monthlyelectric',monthlyelectricController.list);
router.post('/admin/monthlyelectric/add',monthlyelectricController.save);
router.get('/admin/monthlyelectric/delete/:id',monthlyelectricController.delete);
router.get('/admin/monthlyelectric/update/:id',monthlyelectricController.edit);
router.post('/admin/monthlyelectric/update/:id',monthlyelectricController.update);
router.get('/admin/monthlyelectric/new',monthlyelectricController.new);
router.post('/admin/monthlyelectric/addelectric',monthlyelectricController.create);
router.post('/admin/monthlyelectric/submit/:id',monthlyelectricController.submit);
module.exports = router;
