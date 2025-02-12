import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertExpenseSchema, insertBudgetSchema, insertGoalSchema, insertEarningSchema } from "@shared/schema";

function isAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
    return;
  }
  next();
}

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Expenses
  app.get("/api/expenses", isAuthenticated, async (req, res) => {
    const expenses = await storage.getExpenses(req.user!.id);
    res.json(expenses);
  });

  app.post("/api/expenses", isAuthenticated, async (req, res) => {
    const parsed = insertExpenseSchema.parse(req.body);
    const expense = await storage.createExpense(req.user!.id, parsed);
    res.json(expense);
  });

  app.patch("/api/expenses/:id", isAuthenticated, async (req, res) => {
    const parsed = insertExpenseSchema.partial().parse(req.body);
    const expense = await storage.updateExpense(parseInt(req.params.id), parsed);
    res.json(expense);
  });

  app.delete("/api/expenses/:id", isAuthenticated, async (req, res) => {
    await storage.deleteExpense(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Budgets
  app.get("/api/budgets", isAuthenticated, async (req, res) => {
    const budgets = await storage.getBudgets(req.user!.id);
    res.json(budgets);
  });

  app.post("/api/budgets", isAuthenticated, async (req, res) => {
    const parsed = insertBudgetSchema.parse(req.body);
    const budget = await storage.createBudget(req.user!.id, parsed);
    res.json(budget);
  });

  app.patch("/api/budgets/:id", isAuthenticated, async (req, res) => {
    const parsed = insertBudgetSchema.partial().parse(req.body);
    const budget = await storage.updateBudget(parseInt(req.params.id), parsed);
    res.json(budget);
  });

  app.delete("/api/budgets/:id", isAuthenticated, async (req, res) => {
    await storage.deleteBudget(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Goals
  app.get("/api/goals", isAuthenticated, async (req, res) => {
    const goals = await storage.getGoals(req.user!.id);
    res.json(goals);
  });

  app.post("/api/goals", isAuthenticated, async (req, res) => {
    const parsed = insertGoalSchema.parse(req.body);
    const goal = await storage.createGoal(req.user!.id, parsed);
    res.json(goal);
  });

  app.patch("/api/goals/:id", isAuthenticated, async (req, res) => {
    const parsed = insertGoalSchema.partial().parse(req.body);
    const goal = await storage.updateGoal(parseInt(req.params.id), parsed);
    res.json(goal);
  });

  app.delete("/api/goals/:id", isAuthenticated, async (req, res) => {
    await storage.deleteGoal(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Earnings
  app.get("/api/earnings", isAuthenticated, async (req, res) => {
    const earnings = await storage.getEarnings(req.user!.id);
    res.json(earnings);
  });

  app.post("/api/earnings", isAuthenticated, async (req, res) => {
    const parsed = insertEarningSchema.parse(req.body);
    const earning = await storage.createEarning(req.user!.id, parsed);
    res.json(earning);
  });

  app.patch("/api/earnings/:id", isAuthenticated, async (req, res) => {
    const parsed = insertEarningSchema.partial().parse(req.body);
    const earning = await storage.updateEarning(parseInt(req.params.id), parsed);
    res.json(earning);
  });

  app.delete("/api/earnings/:id", isAuthenticated, async (req, res) => {
    await storage.deleteEarning(parseInt(req.params.id));
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
