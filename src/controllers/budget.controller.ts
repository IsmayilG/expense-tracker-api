import { Request, Response } from "express";
import { BudgetService } from "../services/budget.service";
import { ResponseUtil } from "../utils/response.util";
import { AuthRequest } from "../middlewares/auth.middleware";

export class BudgetController {
  private service: BudgetService;
  constructor() { this.service = new BudgetService(); }

  list = async (req: Request, res: Response) => {
    const user = (req as AuthRequest).user;
    if (!user) return res.status(401).json(ResponseUtil.error("Unauthorized"));
    const { month, year } = req.query;
    const result = await this.service.list(user.userId, month ? parseInt(month as string) : undefined, year ? parseInt(year as string) : undefined);
    res.json(ResponseUtil.success(result, "Budgets listed"));
  };

  create = async (req: Request, res: Response) => {
    try {
      const user = (req as AuthRequest).user;
      if (!user) return res.status(401).json(ResponseUtil.error("Unauthorized"));
      await this.service.create(user.userId, req.body);
      res.status(201).json(ResponseUtil.success(null, "Budget created"));
    } catch (e: any) { res.status(400).json(ResponseUtil.error(e.message)); }
  };
}