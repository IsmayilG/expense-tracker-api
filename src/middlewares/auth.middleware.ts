import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ResponseUtil } from "../utils/response.util";

export interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json(ResponseUtil.error("Missing token"));
    return;
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json(ResponseUtil.error("Invalid token"));
  }
};