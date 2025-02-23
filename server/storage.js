import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false }
});

// Budget Schema
const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true }
});

// Goal Schema
const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date },
  status: { type: String, default: 'in_progress' }
});

// Earning Schema
const earningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Budget = mongoose.model('Budget', budgetSchema);
const Goal = mongoose.model('Goal', goalSchema);
const Earning = mongoose.model('Earning', earningSchema);

export const storage = {
  sessionStore: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/wealthwizard'
  }),

  // User operations
  async getUser(id) {
    return User.findById(id);
  },

  async getUserByUsername(username) {
    return User.findOne({ username });
  },

  async createUser(data) {
    const user = new User(data);
    return user.save();
  },

  // Expense operations
  async getExpenses(userId) {
    return Expense.find({ userId });
  },

  async createExpense(userId, data) {
    const expense = new Expense({ ...data, userId });
    return expense.save();
  },

  async updateExpense(id, data) {
    return Expense.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteExpense(id) {
    return Expense.findByIdAndDelete(id);
  },

  // Budget operations
  async getBudgets(userId) {
    return Budget.find({ userId });
  },

  async createBudget(userId, data) {
    const budget = new Budget({ ...data, userId });
    return budget.save();
  },

  async updateBudget(id, data) {
    return Budget.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteBudget(id) {
    return Budget.findByIdAndDelete(id);
  },

  // Goal operations
  async getGoals(userId) {
    return Goal.find({ userId });
  },

  async createGoal(userId, data) {
    const goal = new Goal({ ...data, userId });
    return goal.save();
  },

  async updateGoal(id, data) {
    return Goal.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteGoal(id) {
    return Goal.findByIdAndDelete(id);
  },

  // Earning operations
  async getEarnings(userId) {
    return Earning.find({ userId });
  },

  async createEarning(userId, data) {
    const earning = new Earning({ ...data, userId });
    return earning.save();
  },

  async updateEarning(id, data) {
    return Earning.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteEarning(id) {
    return Earning.findByIdAndDelete(id);
  }
}; 