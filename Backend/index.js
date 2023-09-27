import express from 'express';
import userRouter from './routes/userRoute'; // Import the user route

const app = express();
const port = 3000;

app.use(express.json());

// Use the user route
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
