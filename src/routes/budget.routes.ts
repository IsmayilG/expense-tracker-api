import { Router } from "express";
import { BudgetController } from "../controllers/budget.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const ctrl = new BudgetController();

router.use(authenticate);
router.get("/", ctrl.list);
router.post("/", ctrl.create);

export default router;