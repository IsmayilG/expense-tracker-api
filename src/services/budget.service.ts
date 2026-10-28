import { BudgetRepository } from "../repositories/budget.repository";

export class BudgetService {
  private repo: BudgetRepository;
  constructor() { this.repo = new BudgetRepository(); }

  async list(userId: string, month?: number, year?: number) {
    return this.repo.findByUser(userId, month, year);
  }

  async create(userId: string, data: any) {
    return this.repo.create({ ...data, userId });
  }
}