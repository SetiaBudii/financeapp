import express from 'express';
import { createIncome, getAllIcnome, getAllIncomeByUsername} from '../controllers/incomeController.js';

const router = express.Router();

router.post('/income', createIncome);
router.get('/income', getAllIcnome);
router.get('/income/:username', getAllIncomeByUsername);

export default router;