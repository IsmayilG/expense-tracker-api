import { prisma } from "../config/db";
import { Transaction, TransactionType } from "@prisma/client";

export class TransactionRepository {
  async findByUser(userId: string, page = 1, limit = 20, type?: TransactionType) {
    const skip = (page - 1) * limit;
    const where: any = { userId };
    if (type) where.type = type;
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({ where, skip, take: limit, include: { category: true }, orderBy: { date: "desc" } }),
      prisma.transaction.count({ where }),
    ]);
    return { transactions, total, page, limit };
  }

  async create(data: { amount: number; type: TransactionType; description?: string; date?: Date; userId: string; categoryId: string }) {
    return prisma.transaction.create({ data, include: { category: true } });
  }

  async delete(id: string, userId: string) {
    return prisma.transaction.delete({ where: { id } });
  }
}