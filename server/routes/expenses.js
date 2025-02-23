const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/expenses', async (req, res) => {
  const { amount, category, description, date, title } = req.body;
  try {
    const newExpense = new Expense({
      amount,
      category,
      description,
      date,
      title,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;