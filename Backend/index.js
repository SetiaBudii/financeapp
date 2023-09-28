import express from 'express';
import userRouter from './routes/userRoute.js'; // Import the user route
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
