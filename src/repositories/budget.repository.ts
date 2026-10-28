import { prisma } from "../config/db";
import { Budget } from "@prisma/client";

export class BudgetRepository {
  async findByUser(userId: string, month?: number, year?: number) {
    const where: any = { userId };
    if (month) where.month = month;
    if (year) where.year = year;
    return prisma.budget.findMany({ where, include: { category: true } });
  }

  async create(data: { amount: number; month: number; year: number; userId: string; categoryId?: string }) {
    return prisma.budget.create({ data, include: { category: true } });
  }
}