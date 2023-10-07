// Import necessary modules
import express from 'express';
import {createWallet,getWalletbyUsername} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);

router.get('/wallet/:username', getWalletbyUsername);

export default router;


