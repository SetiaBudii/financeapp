import express from 'express';
import { getTipe } from '../controllers/tipeController.js';

// Create an Express Router
const router = express.Router();

// Define a route to get all 'tipe_wallet' items
router.get('/tipe_wallet', getTipe);



export default router;