import { TransactionRepository } from ""../repositories/transaction.repository"";
import { AppError } from ""../utils/app-error.util"";

export class TransactionService {
  private repo: TransactionRepository;
  constructor() { this.repo = new TransactionRepository(); }

  async list(userId: string, page = 1, limit = 20, type?: string) {
    return this.repo.findByUser(userId, page, limit, type);
  }

  async create(userId: string, data: any) {
    return this.repo.create(userId, data);
  }

  async remove(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}
