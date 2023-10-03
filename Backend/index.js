import express from 'express';
import userRouter from './routes/userRoute.js'; // Import the user route

import tipeRouter from './routes/tipeRoute.js'
import walletRouter from './routes/walletRoute.js'

import incomeRouter from './routes/incomeRoute.js'; // Import the income route
import outcomeRouter from './routes/outcomeRoute.js'; // Import the outcome route
import kategoriRouter from './routes/kategoriRoute.js'; // Import the outcome route

import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);
app.use(tipeRouter);
app.use(walletRouter);

// Use the income route
app.use(incomeRouter);
// Use the outcome route
app.use(outcomeRouter);
// Use the kategori route
app.use(kategoriRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
