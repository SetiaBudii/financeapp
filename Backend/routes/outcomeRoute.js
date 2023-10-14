import express from 'express';
import {createOutcome , getAllOutcome, getOutcomeByUser, getUserOutcomes}from '../controllers/outcomeController.js';

const router = express.Router();

router.get('/outcome/per/:username', getUserOutcomes); // Put the more specific route first
router.post('/outcome', createOutcome);
router.get('/outcome', getAllOutcome);
// router.get('/outcome/:id_wallet', getOutcomeByUser);

export default router;