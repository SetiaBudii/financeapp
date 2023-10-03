// Import necessary modules
import express from 'express';
import {createWallet} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);

export default router;


