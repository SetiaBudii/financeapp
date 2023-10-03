import express from 'express';
import userRouter from './routes/userRoute.js'; // Import the user route
import tipeRouter from './routes/tipeRoute.js'
import walletRouter from './routes/walletRoute.js'
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);
app.use(tipeRouter);
app.use(walletRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
