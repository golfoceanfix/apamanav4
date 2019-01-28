const express = require('express');
const router = express.Router();

const wiController = require('../controllers/wiController');
router.get('/wi',wiController.list);
router.post('/wi/add',wiController.save);
router.get('/wi/delete/:id',wiController.delete);
router.get('/wi/update/:id',wiController.edit);
router.post('/wi/update/:id',wiController.update);
router.get('/wi/new',wiController.new);

module.exports = router;
