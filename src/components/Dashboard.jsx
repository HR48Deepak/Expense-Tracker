import { useMemo, useState } from "react";
import ExpensePieChart from "./ExpensePieChart";
import { useSelector } from "react-redux";
import ExpenseModal from "./ExpenseModal";
import TransactionList from "./TransactionList";
import IncomeModal from "./IncomeModal";
import ExpenseBarChart from "./ExpenseBarChart";
import { GiExpense } from "react-icons/gi";

function Dashboard() {
  const { balance, expenses } = useSelector((state) => state.expense);
  const [isExpenseModalOpen, setExpenseModal] = useState(false);
  const [isIncomeModalOpen, setIncomeModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.price, 0);

  const chartData = useMemo(() => {
    const groups = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.price;
      return acc;
    }, {});
    return Object.keys(groups).map((name) => ({ name, value: groups[name] }));
  }, [expenses]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setExpenseModal(true);
  };

  return (
    <>
      <div className="bg-slate-500 p-4 md:p-10 text-white min-h-screen">
        <h1 className="mb-8 flex gap-2 font-bold text-3xl "><GiExpense className="size-15 relative text-orange-400 bottom-5"/> Expense Tracker </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* wallet */}
          <div className="p-8 rounded-2xl bg-slate-700 shadow-lg text-center">
            <h2 className="text-xl ">
              Wallet Balance:
              <span className="text-green-300 font-bold">₹{balance}</span>
            </h2>
            <button
              onClick={() => setIncomeModal(true)}
              className="mt-4 bg-green-300 text-black px-8 py-2 rounded-full font-bold hover:scale-105 hover:cursor-pointer transition"
            >
              + Add Income
            </button>
          </div>
          {/* expense  */}
          <div className="p-8 rounded-2xl bg-slate-700 shadow-lg text-center">
            <h2 className=" text-xl">
              Expenses:
              <span className="text-orange-300 font-bold">₹{totalExpense}</span>
            </h2>
            <button
              onClick={() => setExpenseModal(true)}
              className="mt-4 bg-red-500 text-white px-8 py-2 rounded-full font-bold hover:scale-105 hover:cursor-pointer transition"
            >
              + Add Expense
            </button>
          </div>
          {/* pie */}
          <div className="flex items-center justify-center">
            <ExpensePieChart data={chartData} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TransactionList transactions={expenses} onEdit={handleEdit} />
          <ExpenseBarChart data={chartData} />
        </div>

        {/* {isExpenseModalOpen && <ExpenseModal onClose={() => setExpenseModal(false)} />} */}
        {isExpenseModalOpen && (
          <ExpenseModal
            onClose={() => {
              setExpenseModal(false);
              setEditingTransaction(null);
            }}
            editData={editingTransaction}
          />
        )}
        {isIncomeModalOpen && (
          <IncomeModal onClose={() => setIncomeModal(false)} />
        )}
      </div>
    </>
  );
}

export default Dashboard;
