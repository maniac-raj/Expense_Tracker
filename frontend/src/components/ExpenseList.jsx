import React, { useEffect, useState } from 'react'
import api from '../api';

const ExpenseList = ({ expenses, setEditExpense, setModel, setExpenses }) => {

  const handleEdit = (item) => {
      setModel();
      setEditExpense(item);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure, You wanna delete the expense !")) return;
    
    try {
      await api.delete(`/delete-expense/${id}`);
      setExpenses((prev) => prev.filter((i) => i._id != id))
    } catch (error) {
      console.error("Failed to delete: ", error)
    }
  }

  return (
    <div className='p-6'>
      <table className='min-w-full border border-gray-500 rounded-md'>
        <thead>
          <tr>
            <th className='p-2 border'>Title</th>
            <th className='p-2 border'>Amount</th>
            <th className='p-2 border'>Category</th>
            <th className='p-2 border'>Date</th>
            <th className='p-2 border'>Type</th>
            <th className='p-2 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((item) => (
              <tr
                key={item._id}
              >
                <td className='p-2 border'>{item.title}</td>
                <td className='p-2 border'>{item.amount}</td>
                <td className='p-2 border'>{item.category}</td>
                <td className='p-2 border'>{item.date.split("T")[0]}</td>
                <td className={`p-2 border border-black ${item.type === "income" ? "text-green-700" : "text-red-600"}`}>
                  {item.type}
                </td>
                <td className='p-2 border'>
                  <button
                    onClick={() => { handleEdit(item) }}
                    className='p-2 mr-2 border rounded-2xl hover:bg-yellow-500'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='p-2 border rounded-2xl hover:bg-red-400'

                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseList