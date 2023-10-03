import express from 'express';
import { createIncome, getAllIcnome, getIncomeByUser} from '../controllers/incomeController.js';

const router = express.Router();

router.post('/income', createIncome);
router.get('/income', getAllIcnome);
router.get('/income/:id_wallet', getIncomeByUser);

export default router;