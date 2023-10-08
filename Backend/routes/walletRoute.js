// Import necessary modules
import express from 'express';
import {createWallet,getWalletbyUsername,getWalletbyUsernamed,deleteWallet} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);
router.get('/wallets/:username', getWalletbyUsernamed);

router.get('/wallet/:username', getWalletbyUsername);

router.delete('/wallet/:username/:tipe', deleteWallet);

export default router;


