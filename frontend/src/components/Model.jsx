import React from 'react'

const Model = ({ isModelOpen, onClose, setEditExpense, children }) => {
  if (!isModelOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative max-h-screen overflow-y-auto">
        <button
          onClick={() => { onClose(); setEditExpense(null); }}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center"
        >
          ✕
        </button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Model