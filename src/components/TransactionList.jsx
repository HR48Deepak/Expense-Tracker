import { useState } from "react";
import { MdOutlineCancel, MdOutlineModeEdit, MdSearch } from "react-icons/md"; // Added MdSearch
import { useDispatch } from "react-redux";
import { deleteExpense } from "../redux/expenseSlice";
import { FaPizzaSlice, FaExclamationTriangle } from "react-icons/fa";

function TransactionList({ transactions, onEdit }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deleteExpense(selectedId));
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-4xl p-6 text-black shadow-lg h-full relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="italic font-bold text-xl">Recent Transactions</h3>
          
          <div className="relative flex-1 max-w-xs">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-xl text-gray-400 italic flex items-center justify-center h-40">
            {searchQuery ? "No matching results" : "No Transactions"}
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-4 p-2">
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b border-gray-100 pb-3"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="bg-gray-100 p-3 rounded-full text-xl shrink-0">
                    <FaPizzaSlice className="text-yellow-400"/>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 min-w-0">
                    <p className="font-semibold truncate w-12 md:w-auto">
                      {t.title}
                    </p>
                    <p className="text-gray-400 text-xs">{t.date}</p>
                    <span className="text-orange-300 font-bold md:hidden">
                      ₹{t.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden md:block text-orange-300 font-bold">
                    ₹{t.price}
                  </span>

                  <button
                    onClick={() => openDeleteModal(t.id)}
                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                  >
                    <MdOutlineCancel />
                  </button>

                  <button
                    onClick={() => onEdit(t)}
                    className="bg-yellow-500 text-white rounded-full p-2"
                  >
                    <MdOutlineModeEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this transaction..!
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionList;