const express = require('express');
const router = express.Router();

const moveinController = require('../controllers/moveinController');

router.get('/movein',moveinController.list)
router.post('/movein/add',moveinController.save);
router.get('/movein/delete/:id',moveinController.delete);
router.get('/movein/update/:id',moveinController.edit);
router.post('/movein/update/:id',moveinController.update);
router.get('/movein/new',moveinController.new);
module.exports = router;
