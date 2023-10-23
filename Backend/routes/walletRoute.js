// Import necessary modules
import express from 'express';
import {createWallet,getWalletbyUsername,getWalletbyUsernamed,deleteWallet,getWalletbyId} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);
router.get('/wallet/:username',getWalletbyUsername);
router.get('/wallets/:username',getWalletbyUsernamed);
router.delete('/wallet/:username/:tipe',deleteWallet);
router.get('/wallet/id/:id_wallet',getWalletbyId);

export default router;

