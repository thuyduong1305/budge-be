import express from "express";
import * as dotenv from "dotenv";
import connection from "./config/database.js";
import { Router } from "express";
import { amountRouter, incomeRouter, paymentHistory } from "./routes/index.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.use("/amount", amountRouter);
app.use("/income", incomeRouter);
app.use("/payment_history", paymentHistory);

(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log("Error connect to db", err);
  }
})();
