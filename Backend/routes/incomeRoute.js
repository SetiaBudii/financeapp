import express from 'express';
import { createIncome, getAllIcnome, getIncomeByUser,getIncomeInPeriod,getTotalIncomeInPeriod} from '../controllers/incomeController.js';

const router = express.Router();

router.post('/income', createIncome);
router.get('/income', getAllIcnome);
// router.get('/income/:username', getAllIncomeByUsername);
router.get('/income/per/:username', getIncomeByUser);
router.get('/income/periode', getIncomeInPeriod);
router.get('/income/totalincomeperiode', getTotalIncomeInPeriod);


export default router;