// Import necessary modules
import express from 'express';
import {createWallet,getIDWalletByUnameTipe} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);
router.post('/wallet/getid',getIDWalletByUnameTipe);

export default router;


