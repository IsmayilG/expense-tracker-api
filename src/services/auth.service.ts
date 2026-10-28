import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";
import { env } from "../config/env";
import { AppError } from "../utils/app-error.util";

export interface TokenPair { accessToken: string; refreshToken: string; }

export class AuthService {
  private repo: AuthRepository;
  constructor() { this.repo = new AuthRepository(); }

  async register(data: { email: string; password: string; name?: string }) {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new AppError("Email already registered", 400);
    const hashed = await bcrypt.hash(data.password, 12);
    const user = await this.repo.createUser({ email: data.email, password: hashed, name: data.name });
    return { user: { id: user.id, email: user.email, name: user.name ?? undefined }, tokens: this.generateTokens(user.id) };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.repo.findByEmail(data.email);
    if (!user) throw new AppError("Invalid credentials", 401);
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new AppError("Invalid credentials", 401);
    return { user: { id: user.id, email: user.email, name: user.name ?? undefined }, tokens: this.generateTokens(user.id) };
  }

  private generateTokens(userId: string): TokenPair {
    return {
      accessToken: jwt.sign({ userId }, env.JWT_SECRET as Secret, { expiresIn: env.JWT_EXPIRES_IN as any }),
      refreshToken: jwt.sign({ userId }, env.JWT_REFRESH_SECRET as Secret, { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any }),
    };
  }
}