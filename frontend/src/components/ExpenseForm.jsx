import React, { useEffect, useState } from 'react'
import api from '../api.js';

const initialState = { title: "", amount: "", category: "General", date: "", type: "expense" }

const ExpenseForm = ({ fetchExpense, editExpense, setModel }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editExpense) {
      setForm({
        ...editExpense,
        date: new Date(editExpense.date).toISOString().split("T")[0],
        amount: editExpense.amount.toString()
      })
    }
  }, [editExpense])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "amount" ? value : value }));
  }

  const validate = () => {
    if (!form.title.trim()) return "Title required!";
    if (!form.amount || Number(form.amount) <= 0) return "Valid amount needed!";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      const payload = {
        ...form,
        amount: Number(form.amount),
        date: form.date
      };

      if (editExpense) {
        await api.put(`/update-expense/${editExpense._id}`, payload);
      } else {
        await api.post('/create-expense', payload);
      }

      setForm(initialState);
      fetchExpense();
      setModel();
    } catch (err) {
      setError(err?.response?.data?.message || "Network error!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {editExpense ? "Edit" : "Add"} Expense
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />

        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />

        <select name="category" value={form.category} onChange={handleChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500">
          {["General", "Food", "Transport", "Salary", "Utilities"].map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} required
          className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" />

        <select name="type" value={form.type} onChange={handleChange}
          className="p-3 border rounded-lg sm:col-span-2 focus:ring-2 focus:ring-indigo-500">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105 disabled:opacity-60"
      >
        {loading ? "Saving..." : editExpense ? "UPDATE" : "ADD EXPENSE"}
      </button>
    </form>
  )
}

export default ExpenseForm