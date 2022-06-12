import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoesss",
    amount: 69.99,
    date: new Date("2022-06-08"),
  },
  { id: "e2", description: "A hat", amount: 25, date: new Date("2022-04-22") },
  {
    id: "e3",
    description: "Sunglasses",
    amount: 10,
    date: new Date("2022-06-05"),
  },
  { id: "e4", description: "A book", amount: 35, date: new Date("2022-03-22") },
  {
    id: "e5",
    description: "A pair of shoes",
    amount: 69.99,
    date: new Date("2022-01-22"),
  },
  { id: "e6", description: "A hat", amount: 25, date: new Date("2022-04-22") },
  {
    id: "e7",
    description: "Sunglasses",
    amount: 10,
    date: new Date("2022-05-22"),
  },
  { id: "e8", description: "A book", amount: 35, date: new Date("2022-03-22") },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReduder = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReduder, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
