import express from 'express';
import { createUser, getAllUsers, getUserById } from './controllers/userController.js';

const app = express();
const port = 3000;

app.use(express.json());

// Create a new user
app.post('/users', createUser);

// Get all users
app.get('/users', getAllUsers);

// Get a user by ID
app.get('/users/:id', getUserById);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
