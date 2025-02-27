import express from 'express';
import {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
} from '../controllers/staffController';

const router = express.Router();


router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/:staffId', getStaffById);
router.put('/:staffId', updateStaff);
router.delete('/:staffId', deleteStaff);

export default router;
