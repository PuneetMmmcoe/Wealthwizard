import { createServer } from "http";
import { setupAuth } from "./auth.js";
import { storage } from "./storage.js";

function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
    return;
  }
  next();
}

export function registerRoutes(app) {
  setupAuth(app);

  // Expenses
  app.get("/api/expenses", isAuthenticated, async (req, res) => {
    const expenses = await storage.getExpenses(req.user.id);
    res.json(expenses);
  });

  app.post("/api/expenses", isAuthenticated, async (req, res) => {
    const expense = await storage.createExpense(req.user.id, req.body);
    res.json(expense);
  });

  app.patch("/api/expenses/:id", isAuthenticated, async (req, res) => {
    const expense = await storage.updateExpense(req.params.id, req.body);
    res.json(expense);
  });

  app.delete("/api/expenses/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteExpense(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({ message: "Failed to delete expense" });
    }
  });

  // Budgets
  app.get("/api/budgets", isAuthenticated, async (req, res) => {
    try {
      const budgets = await storage.getBudgets(req.user._id);
      res.json(budgets);
    } catch (error) {
      console.error("Error getting budgets:", error);
      res.status(500).json({ message: "Failed to get budgets" });
    }
  });

  app.post("/api/budgets", isAuthenticated, async (req, res) => {
    try {
      const budget = await storage.createBudget(req.user._id, req.body);
      res.json(budget);
    } catch (error) {
      console.error("Error creating budget:", error);
      res.status(500).json({ message: error.message || "Failed to create budget" });
    }
  });

  app.patch("/api/budgets/:id", isAuthenticated, async (req, res) => {
    // Use req.params.id directly (MongoDB ObjectId is a string)
    const budget = await storage.updateBudget(req.params.id, req.body);
    res.json(budget);
  });

  app.delete("/api/budgets/:id", isAuthenticated, async (req, res) => {
    await storage.deleteBudget(req.params.id);
    res.sendStatus(200);
  });

  // Goals
  app.get("/api/goals", isAuthenticated, async (req, res) => {
    const goals = await storage.getGoals(req.user.id);
    res.json(goals);
  });

  app.post("/api/goals", isAuthenticated, async (req, res) => {
    const goal = await storage.createGoal(req.user.id, req.body);
    res.json(goal);
  });

  app.patch("/api/goals/:id", isAuthenticated, async (req, res) => {
    // Use req.params.id directly
    const goal = await storage.updateGoal(req.params.id, req.body);
    res.json(goal);
  });

  app.delete("/api/goals/:id", isAuthenticated, async (req, res) => {
    await storage.deleteGoal(req.params.id);
    res.sendStatus(200);
  });

  // Earnings
  app.get("/api/earnings", isAuthenticated, async (req, res) => {
    const earnings = await storage.getEarnings(req.user.id);
    res.json(earnings);
  });

  app.post("/api/earnings", isAuthenticated, async (req, res) => {
    const earning = await storage.createEarning(req.user.id, req.body);
    res.json(earning);
  });

  app.patch("/api/earnings/:id", isAuthenticated, async (req, res) => {
    // Use req.params.id directly
    const earning = await storage.updateEarning(req.params.id, req.body);
    res.json(earning);
  });

  app.delete("/api/earnings/:id", isAuthenticated, async (req, res) => {
    await storage.deleteEarning(req.params.id);
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
