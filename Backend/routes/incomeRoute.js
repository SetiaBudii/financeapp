import express from 'express';
import { createIncome, getAllIcnome, getAllIncomeByUsername, getAllIncomeInPeriode} from '../controllers/incomeController.js';

const router = express.Router();

router.post('/income', createIncome);
router.get('/income', getAllIcnome);
router.get('/income/:username', getAllIncomeByUsername);
router.post('/income/period', getAllIncomeInPeriode);

export default router;