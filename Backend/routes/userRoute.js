// Import necessary modules
import express from 'express';
import { createUser, getAllUsers, getProductByUsername } from './userController'; // Import your user controller function

// Create an Express Router
const router = express.Router();

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getAllUsers);

// Get a user by ID
router.get('/users/:username', getProductByUsername);

export default router;


