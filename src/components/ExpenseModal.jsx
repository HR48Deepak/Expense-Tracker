import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, editExpense } from "../redux/expenseSlice";
import { TiTick } from "react-icons/ti";

function ExpenseModal({ onClose, editData }) {
  const balance = useSelector((state) => state.expense.balance);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [balanceError, setbalanceError] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const validate = () => {
    let tempErrors = {};
    if (!form.title.trim()) tempErrors.title = "Title is required";
    if (!form.price || Number(form.price) <= 0)
      tempErrors.price = "Enter a valid price";
    if (!form.category || form.category === "Select")
      tempErrors.category = "Select a category";
    if (!form.date) tempErrors.date = "Date is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      if (!editData && balance < payload.price) {
        setbalanceError(true);
        setTimeout(() => {
          setbalanceError(false);
        }, 2000);

        return;
      }

      if (editData) {
        dispatch(editExpense(payload));
      } else {
        dispatch(addExpense({ ...payload, id: Date.now() }));
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        {success && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-60 animate-bounce">
            <div className="bg-[#f3b755] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 border-2 border-white">
              <span className="bg-white text-[#f3b755] rounded-full w-6 h-6 flex items-center justify-center font-bold">
                <TiTick />
              </span>
              <p className="font-bold">
                Expense {editData ? "Updated" : "Added"} Successfully!
              </p>
            </div>
          </div>
        )}

        {balanceError && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-60 animate-pulse">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 border-2 border-white">
              <span className="bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                !
              </span>
              <p className="font-bold">Insufficient Balance!</p>
            </div>
          </div>
        )}
        <div className="bg-[#efefef] p-8 rounded-4xl w-125 text-black shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 italic">
            {editData ? "Edit expense" : "Add Expenses"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* title */}
            <div className="flex flex-col">
              <input
                value={form.title}
                className={`p-3 rounded-xl shadow-inner border-none bg-white ${errors.title ? "ring-2 ring-red-400" : ""
                  }`}
                type="text"
                placeholder="Title"
                // onChange={e => handleChange('title', e.target.value)}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <span className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.title}
                </span>
              )}
            </div>

            {/* price */}
            <div className="flex flex-col">
              <input
                value={form.price}
                className={`p-3 rounded-xl shadow-inner border-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  ${errors.price ? "ring-2 ring-red-400" : ""
                  }`}
                type="number"
                placeholder="Price"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              {errors.price && (
                <span className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.price}
                </span>
              )}
            </div>

            {/* category */}
            <div className="flex flex-col">
              <select
                value={form.category}
                className={`p-3 rounded-xl shadow-inner border-none bg-white ${errors.category ? "ring-2 ring-red-400" : ""
                  }`}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Select</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Entertainment</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.category}
                </span>
              )}
            </div>

            {/* date */}
            <div className="flex flex-col">
              <input
                value={form.date}
                type="date"
                className={`p-3 rounded-xl shadow-inner border-none bg-white ${errors.date ? "ring-2 ring-red-400" : ""
                  }`}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              {errors.date && (
                <span className="text-red-500 text-[10px] mt-1 ml-1">
                  {errors.date}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#f3b755] text-white py-3 rounded-2xl font-bold"
            >
              {editData ? "Save Changes" : "Add Expense"}
            </button>
            <button
              type="buton"
              onClick={onClose}
              className="bg-white border py-3 rounded-2xl font-bold"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpenseModal;
