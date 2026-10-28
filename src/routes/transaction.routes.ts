import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const ctrl = new TransactionController();

router.use(authenticate);
router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.remove);

export default router;