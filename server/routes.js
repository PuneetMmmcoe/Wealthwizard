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
    try {
      const expenses = await storage.getExpenses(req.user._id);
      res.json(expenses);
    } catch (error) {
      console.error("Error getting expenses:", error);
      res.status(500).json({ message: "Failed to get expenses" });
    }
  });

  app.post("/api/expenses", isAuthenticated, async (req, res) => {
    try {
      const expense = await storage.createExpense(req.user._id, req.body);
      res.json(expense);
    } catch (error) {
      console.error("Error creating expense:", error);
      res.status(500).json({ message: error.message || "Failed to create expense" });
    }
  });

  app.patch("/api/expenses/:id", isAuthenticated, async (req, res) => {
    try {
      const expense = await storage.updateExpense(req.params.id, req.body);
      res.json(expense);
    } catch (error) {
      console.error("Error updating expense:", error);
      res.status(500).json({ message: "Failed to update expense" });
    }
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
    try {
      const budget = await storage.updateBudget(req.params.id, req.body);
      res.json(budget);
    } catch (error) {
      console.error("Error updating budget:", error);
      res.status(500).json({ message: "Failed to update budget" });
    }
  });

  app.delete("/api/budgets/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBudget(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting budget:", error);
      res.status(500).json({ message: "Failed to delete budget" });
    }
  });

  // Goals
  app.get("/api/goals", isAuthenticated, async (req, res) => {
    try {
      const goals = await storage.getGoals(req.user._id);
      res.json(goals);
    } catch (error) {
      console.error("Error getting goals:", error);
      res.status(500).json({ message: "Failed to get goals" });
    }
  });

  app.post("/api/goals", isAuthenticated, async (req, res) => {
    try {
      const goal = await storage.createGoal(req.user._id, req.body);
      res.json(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      res.status(500).json({ message: error.message || "Failed to create goal" });
    }
  });

  app.patch("/api/goals/:id", isAuthenticated, async (req, res) => {
    try {
      const goal = await storage.updateGoal(req.params.id, req.body);
      res.json(goal);
    } catch (error) {
      console.error("Error updating goal:", error);
      res.status(500).json({ message: "Failed to update goal" });
    }
  });

  app.delete("/api/goals/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteGoal(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting goal:", error);
      res.status(500).json({ message: "Failed to delete goal" });
    }
  });

  // Earnings
  app.get("/api/earnings", isAuthenticated, async (req, res) => {
    try {
      const earnings = await storage.getEarnings(req.user._id);
      res.json(earnings);
    } catch (error) {
      console.error("Error getting earnings:", error);
      res.status(500).json({ message: "Failed to get earnings" });
    }
  });

  app.post("/api/earnings", isAuthenticated, async (req, res) => {
    try {
      const earning = await storage.createEarning(req.user._id, req.body);
      res.json(earning);
    } catch (error) {
      console.error("Error creating earning:", error);
      res.status(500).json({ message: error.message || "Failed to create earning" });
    }
  });

  app.patch("/api/earnings/:id", isAuthenticated, async (req, res) => {
    try {
      const earning = await storage.updateEarning(req.params.id, req.body);
      res.json(earning);
    } catch (error) {
      console.error("Error updating earning:", error);
      res.status(500).json({ message: "Failed to update earning" });
    }
  });

  app.delete("/api/earnings/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEarning(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting earning:", error);
      res.status(500).json({ message: "Failed to delete earning" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
