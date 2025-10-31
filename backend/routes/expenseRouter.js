const express = require('express');
const { createExpense, getExpense, updateExpense, deleteExpense } = require('../cotrollers/expenseController');
const expenseRouter = express.Router();

expenseRouter.post('/create-expense', createExpense);
expenseRouter.get('/get-expenses', getExpense);
expenseRouter.put('/update-expense/:id', updateExpense);
expenseRouter.delete('/delete-expense/:id', deleteExpense);

module.exports = { expenseRouter }