const express = require('express');
const router = express.Router();

const monthlywaterController = require('../controllers/monthlywaterController');
router.get('/monthlywater',monthlywaterController.list);
router.post('/monthlywater1',monthlywaterController.list2);
router.post('/monthlywater/save',monthlywaterController.save);
router.get('/monthlywater/delete/:id',monthlywaterController.delete);
router.get('/monthlywater/update/:id',monthlywaterController.edit);
router.post('/monthlywater/update/:id',monthlywaterController.update);
router.get('/monthlywater/new',monthlywaterController.new);
router.post('/monthlywater/addwather',monthlywaterController.create);
router.post('/monthlywater/submit/:id',monthlywaterController.insert);
module.exports = router;
