import React, { useState } from 'react'
import ExpenseForm from '../components/expenseForm'


const Dashboard = () => {

  return (
    <div>
      <div className="bg-amber-50 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          💰 Expense Tracker
        </h1>
        <p className="text-gray-500 text-center">Track your expenses smartly!</p>
        <div>
          <ExpenseForm />
        </div>
      </div>
    </div>
  )
}

export default Dashboard