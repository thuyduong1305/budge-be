import express from "express";
import { amountController } from "../controllers/index.js";
const router = express.Router();

router.get("/", amountController.getAmountList);
router.get("/:id", amountController.getAmountById);

router.post("/", amountController.createAmount);
router.patch("/", amountController.updateAmount);
router.delete("/:id", amountController.deleteAmount);
// router.post("/fake", amountController.generateFakeAmounts);
export default router;
