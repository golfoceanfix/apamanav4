const express = require('express');
const router = express.Router();

const moveoutController = require('../controllers/moveoutController');

router.get('/moveout',moveoutController.list)
router.post('/moveout/add',moveoutController.save);
router.get('/moveout/delete/:id',moveoutController.delete);
router.get('/moveout/update/:id',moveoutController.edit);
router.post('/moveout/update/:id',moveoutController.update);
router.get('/moveout/new',moveoutController.new);
module.exports = router;
