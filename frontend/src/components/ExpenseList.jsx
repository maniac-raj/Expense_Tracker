import api from '../api';

const ExpenseList = ({ expenses, setEditExpense, setModel, setExpenses, fetchExpense }) => {
  const handleEdit = (item) => {
    setEditExpense(item);
    setModel(true);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await api.delete(`/delete-expense/${id}`);
      fetchExpense(); // Refresh full list
    } catch (err) {
      alert("Delete failed!");
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No expenses on this page. Keep going! 🚀</p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <table className="hidden sm:table min-w-full border border-gray-300 rounded-xl overflow-hidden">
        <thead className="bg-gray-300">
          <tr>
            {['Title', 'Amount', 'Category', 'Date', 'Type', 'Action'].map(h => (
              <th key={h} className="p-3 text-left font-semibold text-gray-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={item._id} className="border-b hover:bg-amber-50 transition">
              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3">₹{item.amount}</td>
              <td className="p-3 text-gray-600">{item.category}</td>
              <td className="p-3 text-sm">{item.date.split("T")[0]}</td>
              <td className={`p-3 font-bold ${item.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {item.type.toUpperCase()}
              </td>
              <td className="p-3">
                <button onClick={() => handleEdit(item)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sm:hidden space-y-4">
        {expenses.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {item.type}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>₹{item.amount}</div>
              <div className="text-gray-600">{item.category}</div>
              <div className="col-span-2 text-gray-500">{item.date.split("T")[0]}</div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(item)} className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseList