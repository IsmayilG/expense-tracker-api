import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseUtil } from "../utils/response.util";

export class AuthController {
  private service: AuthService;
  constructor() { this.service = new AuthService(); }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const result = await this.service.register({ email, password, name });
      res.status(201).json(ResponseUtil.success(result, "Registered"));
    } catch (e: any) { res.status(e.statusCode || 400).json(ResponseUtil.error(e.message)); }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.service.login({ email, password });
      res.json(ResponseUtil.success(result, "Login successful"));
    } catch (e: any) { res.status(e.statusCode || 401).json(ResponseUtil.error(e.message)); }
  };
}