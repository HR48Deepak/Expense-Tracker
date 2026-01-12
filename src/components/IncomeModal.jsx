import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome } from '../redux/expenseSlice';

function IncomeModal({ onClose }) {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); 
    const dispatch = useDispatch();

    const handleAdd = (e) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        
        if (!amount || amount.trim() === "") {
            setError("Please enter the amount");
            return;
        }
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid positive number");
            return;
        }

       
        dispatch(addIncome(numericAmount));
        setSuccess(true); 

       
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className="bg-[#efefef] p-8 rounded-4xl w-100 text-black shadow-2xl">
                
               
                {success && (
                    <div className="absolute inset-0 bg-[#9dff5b] flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
                        <div className="bg-white p-3 rounded-full mb-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                             </svg>
                        </div>
                        <h3 className="text-xl font-bold">₹{amount} Added!</h3>
                        <p className="text-sm opacity-80">Wallet updated successfully</p>
                    </div>
                )}

                <h2 className="text-2xl font-bold mb-6 italic">Add Balance</h2>
                <form onSubmit={handleAdd} className='flex flex-col gap-4'>
                    <input
                        className={`p-3 rounded-xl shadow-inner border-none bg-white [appearance-textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error ? 'border-red-400' : ' focus:border-black'}`}
                        placeholder='Income Amount'
                        type='number'
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            if (error) setError("");
                        }}
                    />
                    
                    {error && <span className="text-red-500 text-xs font-semibold ml-1">{error}</span>}
                    
                    <div className="flex gap-3">
                        <button type="submit" className="flex-1 bg-[#9dff5b] text-black py-3 rounded-2xl font-bold hover:bg-[#8ce650] transition-transform active:scale-95">
                            Add Balance
                        </button>
                        <button type="button" onClick={onClose} className="flex-1 bg-white border py-3 rounded-2xl font-bold hover:bg-gray-50">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IncomeModal;