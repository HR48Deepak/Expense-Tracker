import { createSlice } from "@reduxjs/toolkit";


// const savedData = JSON.parse(localStorage.getItem("expenseData"));

const initialState = {
    balance: 0,
    expenses: []
    // balance: savedData ? savedData.balance : 5000,
    // expenses: savedData ? savedData.expenses : []
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            if (state.balance >= action.payload.price) {
                state.expenses.unshift(action.payload);
                state.balance -= action.payload.price;
                // localStorage.setItem("expenseData", JSON.stringify({
                //     balance: state.balance,
                //     expenses: state.expenses
                // }))
            }

        },
        addIncome: (state, action) => {
            state.balance += Number(action.payload);
            // localStorage.setItem("expenseData",JSON.stringify({
            //     balance:state.balance,
            //     expenses:state.expenses
            // }))
        },
        deleteExpense: (state, action) => {
            const item = state.expenses.find(ex => ex.id === action.payload);
            if (item) state.balance += item.price;
            state.expenses = state.expenses.filter(ex => ex.id !== action.payload);
            // localStorage.setItem("expenseData",JSON.stringify({
            //     balance:state.balance,
            //     expenses:state.expenses
            // }))
        },
        editExpense: (state, action) => {
            const index = state.expenses.findIndex(ex => ex.id === action.payload.id);
            if (index !== -1) {
                state.balance = state.balance + state.expenses[index].price - action.payload.price;
                state.expenses[index] = action.payload;
                // localStorage.setItem("expensesData",JSON.stringify({
                //     balance:state.balance,
                //     expenses:state.expenses
                // }));
            }
        },
    }
});

export const { addExpense, addIncome, deleteExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;