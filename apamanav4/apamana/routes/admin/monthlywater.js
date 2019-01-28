const express = require('express');
const router = express.Router();

const monthlywaterController = require('../../controllers/admin/monthlywaterController');
router.get('/admin/monthlywater',monthlywaterController.list);
router.post('/admin/monthlywater/add',monthlywaterController.save);
router.get('/admin/monthlywater/delete/:id',monthlywaterController.delete);
router.get('/admin/monthlywater/update/:id',monthlywaterController.edit);
router.post('/admin/monthlywater/update/:id',monthlywaterController.update);
router.get('/admin/monthlywater/new',monthlywaterController.new);
router.post('/admin/monthlywater/addwater',monthlywaterController.create);
router.post('/admin/monthlywater/submit/:id',monthlywaterController.submit);
module.exports = router;
