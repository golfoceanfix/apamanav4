const express = require('express');
const router = express.Router();

const checkitemController = require('../controllers/checkitemController');

router.get('/checkitem',checkitemController.list)
router.post('/checkitem/add',checkitemController.save);
router.get('/checkitem/delete/:id',checkitemController.delete);
router.get('/checkitem/update/:id',checkitemController.edit);
router.post('/checkitem/update/:id',checkitemController.update);
router.get('/checkitem/new',checkitemController.new);
module.exports = router;
