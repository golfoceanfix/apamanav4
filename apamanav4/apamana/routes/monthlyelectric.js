const express = require('express');
const router = express.Router();

const monthlyelectricController = require('../controllers/monthlyelectricController');
router.get('/monthlyelectric',monthlyelectricController.list);
router.post('/monthlyelectric1',monthlyelectricController.list2);
router.post('/monthlyelectric/save',monthlyelectricController.save);
router.get('/monthlyelectric/delete/:id',monthlyelectricController.delete);
router.get('/monthlyelectric/update/:id',monthlyelectricController.edit);
router.post('/monthlyelectric/update/:id',monthlyelectricController.update);
router.get('/monthlyelectric/new',monthlyelectricController.new);
router.post('/monthlyelectric/addelectric',monthlyelectricController.create);
router.post('/monthlyelectric/submit/:id',monthlyelectricController.insert);
module.exports = router;
