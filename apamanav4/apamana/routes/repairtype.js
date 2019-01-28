const express = require('express');
const router = express.Router();

const repairtypeController = require('../controllers/repairtypeController');

router.get('/repairtype',repairtypeController.list)
router.post('/repairtype/add',repairtypeController.save);
router.get('/repairtype/delete/:id',repairtypeController.delete);
router.get('/repairtype/update/:id',repairtypeController.edit);
router.post('/repairtype/update/:id',repairtypeController.update);
router.get('/repairtype/new',repairtypeController.new);
module.exports = router;
