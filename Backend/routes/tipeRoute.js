import express from 'express';
import { getTipe,createTipeWallet } from '../controllers/tipeController.js';

// Create an Express Router
const router = express.Router();

// Define a route to get all 'tipe_wallet' items
router.get('/tipe_wallet', getTipe);
router.post('/tipe_wallet', createTipeWallet)



export default router;