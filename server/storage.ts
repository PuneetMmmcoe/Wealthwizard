import { InsertUser, User, Expense, Budget, Goal, Earning, InsertExpense, InsertBudget, InsertGoal, InsertEarning } from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

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

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser;
  }

  // Expense operations
  async getExpenses(userId: number): Promise<Expense[]> {
    return db.select().from(schema.expenses).where(eq(schema.expenses.userId, userId));
  }

  async createExpense(userId: number, expense: InsertExpense): Promise<Expense> {
    const [newExpense] = await db
      .insert(schema.expenses)
      .values({ ...expense, userId })
      .returning();
    return newExpense;
  }

  async updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense> {
    const [updated] = await db
      .update(schema.expenses)
      .set(expense)
      .where(eq(schema.expenses.id, id))
      .returning();
    return updated;
  }

  async deleteExpense(id: number): Promise<void> {
    await db.delete(schema.expenses).where(eq(schema.expenses.id, id));
  }

  // Budget operations
  async getBudgets(userId: number): Promise<Budget[]> {
    return db.select().from(schema.budgets).where(eq(schema.budgets.userId, userId));
  }

  async createBudget(userId: number, budget: InsertBudget): Promise<Budget> {
    const [newBudget] = await db
      .insert(schema.budgets)
      .values({ ...budget, userId })
      .returning();
    return newBudget;
  }

  async updateBudget(id: number, budget: Partial<InsertBudget>): Promise<Budget> {
    const [updated] = await db
      .update(schema.budgets)
      .set(budget)
      .where(eq(schema.budgets.id, id))
      .returning();
    return updated;
  }

  async deleteBudget(id: number): Promise<void> {
    await db.delete(schema.budgets).where(eq(schema.budgets.id, id));
  }

  // Goal operations
  async getGoals(userId: number): Promise<Goal[]> {
    return db.select().from(schema.goals).where(eq(schema.goals.userId, userId));
  }

  async createGoal(userId: number, goal: InsertGoal): Promise<Goal> {
    const [newGoal] = await db
      .insert(schema.goals)
      .values({ ...goal, userId, currentAmount: "0" })
      .returning();
    return newGoal;
  }

  async updateGoal(id: number, goal: Partial<InsertGoal>): Promise<Goal> {
    const [updated] = await db
      .update(schema.goals)
      .set(goal)
      .where(eq(schema.goals.id, id))
      .returning();
    return updated;
  }

  async deleteGoal(id: number): Promise<void> {
    await db.delete(schema.goals).where(eq(schema.goals.id, id));
  }

  // Earning operations
  async getEarnings(userId: number): Promise<Earning[]> {
    return db.select().from(schema.earnings).where(eq(schema.earnings.userId, userId));
  }

  async createEarning(userId: number, earning: InsertEarning): Promise<Earning> {
    const [newEarning] = await db
      .insert(schema.earnings)
      .values({ ...earning, userId })
      .returning();
    return newEarning;
  }

  async updateEarning(id: number, earning: Partial<InsertEarning>): Promise<Earning> {
    const [updated] = await db
      .update(schema.earnings)
      .set(earning)
      .where(eq(schema.earnings.id, id))
      .returning();
    return updated;
  }

  async deleteEarning(id: number): Promise<void> {
    await db.delete(schema.earnings).where(eq(schema.earnings.id, id));
  }
}

export const storage = new DatabaseStorage();