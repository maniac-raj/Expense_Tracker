const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = { Expense };