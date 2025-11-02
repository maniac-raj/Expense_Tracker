import React, { use, useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import Model from '../components/Model';
import ExpenseList from '../components/ExpenseList';
import api from '../api';

const Dashboard = () => {
  const [model, setModel] = useState(false);
  const [editExpense, setEditExpense] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpense = async () => {
    const fetchedExpenses = await api.get('/get-expenses');
    setExpenses(fetchedExpenses.data.data);
  }

  useEffect(() => {
    fetchExpense();
  }, [])

  return (
    <div>
      <div className="bg-amber-50 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          💰 Expense Tracker
        </h1>
        <p className="text-gray-500 text-center">Track your expenses smartly!</p>
        <div className='flex justify-end mr-5'>
          <button
            onClick={() => setModel(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"

          >
            ➕ Add Expense
          </button>
        </div>
        <ExpenseList
          expenses={expenses}
          setEditExpense={setEditExpense}
          setModel={() => { setModel(true) }}
          setExpenses={setExpenses}
        />
        <Model
          isModelOpen={model}
          setEditExpense={setEditExpense}
          onClose={() => setModel(false)}
        >
          <ExpenseForm
            editExpense={editExpense}
            fetchExpense={fetchExpense}
            setModel = {() => {setModel(false)}}
          />
        </Model>
      </div>
    </div>
  )
}

export default Dashboard