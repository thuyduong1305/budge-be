import express from "express";
import { incomeController } from "../controllers/index.js";
const router = express.Router();

router.get("/", incomeController.getIncomeList);
router.get("/:id", incomeController.getIncomeById);

router.post("/", incomeController.createIncome);
router.patch("/", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

export default router;
