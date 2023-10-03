import express from 'express';
import {createOutcome , getAllOutcome, getOutcomeByUser}from '../controllers/outcomeController.js';

const router = express.Router();

router.post('/outcome', createOutcome);
router.get('/outcome', getAllOutcome);
router.get('/outcome/:id_wallet', getOutcomeByUser);

export default router;