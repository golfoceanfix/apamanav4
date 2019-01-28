const express = require('express');
const router = express.Router();

const repairtypeController = require('../../controllers/admin/repairtypeController');

router.get('/admin/repairtype',repairtypeController.list)
router.post('/admin/repairtype/add',repairtypeController.save);
router.get('/admin/repairtype/delete/:id',repairtypeController.delete);
router.get('/admin/repairtype/update/:id',repairtypeController.edit);
router.post('/admin/repairtype/update/:id',repairtypeController.update);
router.get('/admin/repairtype/new',repairtypeController.new);
module.exports = router;
