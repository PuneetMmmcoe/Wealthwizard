import { InsertUser, User, Expense, Budget, Goal, Earning, InsertExpense, InsertBudget, InsertGoal, InsertEarning } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Expense operations
  getExpenses(userId: number): Promise<Expense[]>;
  createExpense(userId: number, expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense>;
  deleteExpense(id: number): Promise<void>;

  // Budget operations
  getBudgets(userId: number): Promise<Budget[]>;
  createBudget(userId: number, budget: InsertBudget): Promise<Budget>;
  updateBudget(id: number, budget: Partial<InsertBudget>): Promise<Budget>;
  deleteBudget(id: number): Promise<void>;

  // Goal operations
  getGoals(userId: number): Promise<Goal[]>;
  createGoal(userId: number, goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<InsertGoal>): Promise<Goal>;
  deleteGoal(id: number): Promise<void>;

  // Earning operations
  getEarnings(userId: number): Promise<Earning[]>;
  createEarning(userId: number, earning: InsertEarning): Promise<Earning>;
  updateEarning(id: number, earning: Partial<InsertEarning>): Promise<Earning>;
  deleteEarning(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private expenses: Map<number, Expense>;
  private budgets: Map<number, Budget>;
  private goals: Map<number, Goal>;
  private earnings: Map<number, Earning>;
  private currentId: { [key: string]: number };

  constructor() {
    this.sessionStore = new MemoryStore({ checkPeriod: 86400000 });
    this.users = new Map();
    this.expenses = new Map();
    this.budgets = new Map();
    this.goals = new Map();
    this.earnings = new Map();
    this.currentId = { users: 1, expenses: 1, budgets: 1, goals: 1, earnings: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getExpenses(userId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.userId === userId,
    );
  }

  async createExpense(userId: number, expense: InsertExpense): Promise<Expense> {
    const id = this.currentId.expenses++;
    const newExpense = { ...expense, id, userId };
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense> {
    const existing = this.expenses.get(id);
    if (!existing) throw new Error("Expense not found");
    const updated = { ...existing, ...expense };
    this.expenses.set(id, updated);
    return updated;
  }

  async deleteExpense(id: number): Promise<void> {
    this.expenses.delete(id);
  }

  async getBudgets(userId: number): Promise<Budget[]> {
    return Array.from(this.budgets.values()).filter(
      (budget) => budget.userId === userId,
    );
  }

  async createBudget(userId: number, budget: InsertBudget): Promise<Budget> {
    const id = this.currentId.budgets++;
    const newBudget = { ...budget, id, userId };
    this.budgets.set(id, newBudget);
    return newBudget;
  }

  async updateBudget(id: number, budget: Partial<InsertBudget>): Promise<Budget> {
    const existing = this.budgets.get(id);
    if (!existing) throw new Error("Budget not found");
    const updated = { ...existing, ...budget };
    this.budgets.set(id, updated);
    return updated;
  }

  async deleteBudget(id: number): Promise<void> {
    this.budgets.delete(id);
  }

  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId,
    );
  }

  async createGoal(userId: number, goal: InsertGoal): Promise<Goal> {
    const id = this.currentId.goals++;
    const newGoal = { ...goal, id, userId, currentAmount: "0" };
    this.goals.set(id, newGoal);
    return newGoal;
  }

  async updateGoal(id: number, goal: Partial<InsertGoal>): Promise<Goal> {
    const existing = this.goals.get(id);
    if (!existing) throw new Error("Goal not found");
    const updated = { ...existing, ...goal };
    this.goals.set(id, updated);
    return updated;
  }

  async deleteGoal(id: number): Promise<void> {
    this.goals.delete(id);
  }

  async getEarnings(userId: number): Promise<Earning[]> {
    return Array.from(this.earnings.values()).filter(
      (earning) => earning.userId === userId,
    );
  }

  async createEarning(userId: number, earning: InsertEarning): Promise<Earning> {
    const id = this.currentId.earnings++;
    const newEarning = { ...earning, id, userId };
    this.earnings.set(id, newEarning);
    return newEarning;
  }

  async updateEarning(id: number, earning: Partial<InsertEarning>): Promise<Earning> {
    const existing = this.earnings.get(id);
    if (!existing) throw new Error("Earning not found");
    const updated = { ...existing, ...earning };
    this.earnings.set(id, updated);
    return updated;
  }

  async deleteEarning(id: number): Promise<void> {
    this.earnings.delete(id);
  }
}

export const storage = new MemStorage();
