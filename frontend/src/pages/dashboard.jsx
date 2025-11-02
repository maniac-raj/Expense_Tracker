import React, { useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import Model from '../components/Model';
import ExpenseList from '../components/ExpenseList';
import api from '../api';

const Dashboard = () => {
  const [model, setModel] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchExpense = async () => {
    const fetchedExpenses = await api.get('/get-expenses');
    setExpenses(fetchedExpenses.data.data);
    setCurrentPage(1);
  }

  useEffect(() => { fetchExpense(); }, []);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-amber-50 shadow-2xl rounded-3xl p-6 sm:p-10 w-full">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Track your money, master your life!
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setModel(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-3 rounded-xl shadow-md transition transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            <span className="hidden sm:inline">Add Expense</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        <ExpenseList
          expenses={paginatedExpenses}
          setEditExpense={setEditExpense}
          setModel={() => setModel(true)}
          setExpenses={setExpenses}
          fetchExpense={fetchExpense}
        />

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              ← Prev
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              Next →
            </button>
          </div>
        )}

        <Model
          isModelOpen={model}
          setEditExpense={setEditExpense}
          onClose={() => setModel(false)}
        >
          <ExpenseForm
            editExpense={editExpense}
            fetchExpense={fetchExpense}
            setModel={() => setModel(false)}
          />
        </Model>
      </div>
    </div>
  )
}

export default Dashboard