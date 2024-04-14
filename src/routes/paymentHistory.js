import express from "express";
import { paymentHistoryController } from "../controllers/index.js";
// import paymentHistory from "../controllers/paymentHistory.js";
const router = express.Router();

router.get("/", paymentHistoryController.getPaymentHistoryList);
router.post("/", paymentHistoryController.createPaymentHistory);

export default router;
