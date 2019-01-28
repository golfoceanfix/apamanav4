const express = require('express');
const router = express.Router();

const waController = require('../controllers/waController');
router.get('/wa',waController.list);
router.post('/wa/add',waController.save);
router.get('/wa/delete/:id',waController.delete);
router.get('/wa/update/:id',waController.edit);
router.post('/wa/update/:id',waController.update);
router.get('/wa/new',waController.new);

module.exports = router;
