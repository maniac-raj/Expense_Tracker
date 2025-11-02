import React from 'react'
import ExpenseForm from './ExpenseForm';

const Model = ({ isModelOpen, onClose, setEditExpense, children }) => {

  if (!isModelOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
        <button
          onClick={() => { 
            onClose(); 
            setEditExpense(null) 
          }}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  )
}

export default Model