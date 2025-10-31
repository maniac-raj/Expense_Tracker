const { Expense } = require("../models/expense")


const getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json({ data: expenses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const createExpense = async (req, res) => {
    try {
        const { title, amount, category, type } = req.body;
        await Expense.create({
            title,
            amount,
            category,
            type
        });
        return res.status(200).json({ message: "Expense added successfully !" });
    } catch (error) {
        return res.status(500).json({ message: "Cannot add expense" + error.message });
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, type } = req.body;
        const expense = await Expense.findByIdAndUpdate(
            id,
            { title, amount, category, type },
            { new: true }
        );

        if (!expense) {
            return res.status(500).json({ message: "Expense not provided !" });
        }

        return res.status(200).json({message: "Expense updated successfully !"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(
            id
        );
        
        if(!expense){
            return res.status(500).json({message: "Expense not found !"});
        }

        return res.status(200).json({message: "Expense successfully deleted !"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = { getExpense, createExpense, updateExpense, deleteExpense };