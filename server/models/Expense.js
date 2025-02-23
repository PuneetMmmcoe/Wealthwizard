const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Path `amount` is required.'],
  },
  category: {
    type: String,
    required: [true, 'Path `category` is required.'],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, 'Path `date` is required.'],
  },
  title: {
    type: String,
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);