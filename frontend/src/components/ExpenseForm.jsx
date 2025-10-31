import React, { useState } from 'react'
import api from '../api.js';
import { FiPlus } from 'react-icons/fi';

const initialState = {
    title: "",
    amount: "",
    category: "General",
    date: "",
    type: "expense"
}

const ExpenseForm = () => {
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name == "amount" ? Number(value) : value }));
    }

    const validate = () => {
        if (!form.title.trim()) {
            return "Title is not provided !"
        }
        if (!form.amount || Number(form.amount) <= 0) {
            return "Enter a valid amount !"
        }
        if (!["income", "expense"].includes(form.type)) {
            return "Type is not valid"
        }
        return null;
    }

    const payload = {
        title: form.title.trim(),
        amount: Number(form.amount),
        category: form.category || "General",
        date: Date(form.date),
        type: form.type
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        try {
            setLoading(true);
            const expense = await api.post('/create-expense', payload);
            setForm(initialState);
        } catch (error) {
            console.error("Cannot add expense: ", error);
            setError(
                error?.response?.data?.message || "Network error try again..."
            )
        } finally {
            setLoading(false);
        }
        console.log(form);

    }

    return (
        <form onSubmit={handleSubmit} className='m-6'>
            <div className="grid grid-cols-1 gap-3 w-full">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder='Title (e.g. Night out)'
                    className='p-2 border rounded'
                />
                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder='Enter the amount'
                    className='p-2 border rounded'
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className='p-2 border rounded'
                >
                    <option> General </option>
                    <option> Food </option>
                    <option> Transport </option>
                    <option> Salary </option>
                    <option> Utilities </option>
                </select>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className='p-2 border rounded'
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className='p-2 border rounded'
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            {error && (
                <p className='text-sm text-red-600 mt-2'>{error}</p>
            )}
            <div className='mt-4 flex justify-center items-end'>
                <button
                    type='submit'
                    disabled={loading}
                    className='p-2 px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-60'
                >
                    {loading ? "Saving..." : "ADD"}
                </button>
            </div>
        </form>
    )
}

export default ExpenseForm