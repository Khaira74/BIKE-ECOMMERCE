const express = require('express');
const {
    createDeptDesig,
    getAllDeptDesig,
    getDeptDesigById,
    updateDeptDesig,
    deleteDeptDesig
} = require('../controllers/deptDesigController');

const router = express.Router();

router.post('/', createDeptDesig);
router.get('/', getAllDeptDesig);
router.get('/:id', getDeptDesigById);
router.put('/:id', updateDeptDesig);
router.delete('/:id', deleteDeptDesig);

module.exports = router;
