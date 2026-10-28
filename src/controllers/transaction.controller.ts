import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { ResponseUtil } from "../utils/response.util";
import { AuthRequest } from "../middlewares/auth.middleware";

export class TransactionController {
  private service: TransactionService;
  constructor() { this.service = new TransactionService(); }

  list = async (req: Request, res: Response) => {
    const user = (req as AuthRequest).user;
    if (!user) return res.status(401).json(ResponseUtil.error("Unauthorized"));
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "20", 10);
    const type = (req.query.type as string) || undefined;
    const result = await this.service.list(user.userId, page, limit, type);
    res.json(ResponseUtil.success(result.transactions, "Transactions listed", { page, limit, total: result.total }));
  };

  create = async (req: Request, res: Response) => {
    try {
      const user = (req as AuthRequest).user;
      if (!user) return res.status(401).json(ResponseUtil.error("Unauthorized"));
      const tx = await this.service.create(user.userId, req.body);
      res.status(201).json(ResponseUtil.success(tx, "Transaction created"));
    } catch (e: any) { res.status(400).json(ResponseUtil.error(e.message)); }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const user = (req as AuthRequest).user;
      if (!user) return res.status(401).json(ResponseUtil.error("Unauthorized"));
      await this.service.remove(req.params.id, user.userId);
      res.json(ResponseUtil.success(null, "Deleted"));
    } catch (e: any) { res.status(e.statusCode || 400).json(ResponseUtil.error(e.message)); }
  };
}