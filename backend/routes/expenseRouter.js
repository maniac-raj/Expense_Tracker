const express = require('express');
const { createExpense, getExpense, updateExpense, deleteExpense } = require('../cotrollers/expenseController');
const expenseRouter = express.Router();

expenseRouter.post('/create-expense', createExpense)
 .get('/get-expenses', getExpense)
 .put('/update-expense/:id', updateExpense)
 .delete('/delete-expense/:id', deleteExpense)

module.exports = { expenseRouter }