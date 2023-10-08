import express from 'express';
import { createIncome, getAllIcnome, getAllIncomeByUsername, getAllIncomeInPeriode, getIncomeByUser} from '../controllers/incomeController.js';

const router = express.Router();

router.post('/income', createIncome);
router.get('/income', getAllIcnome);
router.get('/income/:username', getAllIncomeByUsername);
router.post('/income/period', getAllIncomeInPeriode);
router.get('/income/per/:username', getIncomeByUser);


export default router;