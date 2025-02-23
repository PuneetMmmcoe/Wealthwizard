import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

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
    try {
      return await User.findById(id);
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error('Error getting user');
    }
  },

  async getUserByUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw new Error('Error getting user by username');
    }
  },

  async createUser(data) {
    try {
      const user = new User(data);
      return await user.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  },

  // Expense operations
  async getExpenses(userId) {
    try {
      return await Expense.find({ userId });
    } catch (error) {
      console.error('Error getting expenses:', error);
      throw new Error('Error getting expenses');
    }
  },

  async createExpense(userId, data) {
    try {
      const expense = new Expense({ ...data, userId });
      return await expense.save();
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error('Error creating expense');
    }
  },

  async updateExpense(id, data) {
    try {
      return await Expense.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new Error('Error updating expense');
    }
  },

  async deleteExpense(id) {
    try {
      return await Expense.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw new Error('Error deleting expense');
    }
  },

  // Budget operations
  async getBudgets(userId) {
    try {
      return await Budget.find({ userId });
    } catch (error) {
      console.error('Error getting budgets:', error);
      throw new Error('Error getting budgets');
    }
  },

  async createBudget(userId, data) {
    try {
      const budget = new Budget({ ...data, userId });
      return await budget.save();
    } catch (error) {
      console.error('Error creating budget:', error);
      throw new Error('Error creating budget');
    }
  },

  async updateBudget(id, data) {
    try {
      return await Budget.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error updating budget:', error);
      throw new Error('Error updating budget');
    }
  },

  async deleteBudget(id) {
    try {
      return await Budget.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw new Error('Error deleting budget');
    }
  },

  // Goal operations
  async getGoals(userId) {
    try {
      return await Goal.find({ userId });
    } catch (error) {
      console.error('Error getting goals:', error);
      throw new Error('Error getting goals');
    }
  },

  async createGoal(userId, data) {
    try {
      const goal = new Goal({ ...data, userId });
      return await goal.save();
    } catch (error) {
      console.error('Error creating goal:', error);
      throw new Error('Error creating goal');
    }
  },

  async updateGoal(id, data) {
    try {
      return await Goal.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error updating goal:', error);
      throw new Error('Error updating goal');
    }
  },

  async deleteGoal(id) {
    try {
      return await Goal.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw new Error('Error deleting goal');
    }
  },

  // Earning operations
  async getEarnings(userId) {
    try {
      return await Earning.find({ userId });
    } catch (error) {
      console.error('Error getting earnings:', error);
      throw new Error('Error getting earnings');
    }
  },

  async createEarning(userId, data) {
    try {
      const earning = new Earning({ ...data, userId });
      return await earning.save();
    } catch (error) {
      console.error('Error creating earning:', error);
      throw new Error('Error creating earning');
    }
  },

  async updateEarning(id, data) {
    try {
      return await Earning.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('Error updating earning:', error);
      throw new Error('Error updating earning');
    }
  },

  async deleteEarning(id) {
    try {
      return await Earning.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting earning:', error);
      throw new Error('Error deleting earning');
    }
  }
};