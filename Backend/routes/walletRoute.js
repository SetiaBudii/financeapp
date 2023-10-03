// Import necessary modules
import express from 'express';
import {createWallet,getIDWalletByUnameTipe, getTipeByid} from '../controllers/walletController.js'

// Create an Express Router
const router = express.Router();

router.post('/wallet',createWallet);
router.post('/wallet/getid',getIDWalletByUnameTipe);
router.get('/wallet/:username/:idWallet',getTipeByid);

export default router;


