import express from "express";
import userRouter from "./routes/userRoute.js";
import tipeRouter from "./routes/tipeRoute.js";
import walletRouter from "./routes/walletRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import outcomeRouter from "./routes/outcomeRoute.js";
import kategoriRouter from "./routes/kategoriRoute.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Use the user route
app.use(userRouter);
app.use(tipeRouter);
app.use(walletRouter);
app.use(incomeRouter);
app.use(outcomeRouter);
app.use(kategoriRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
