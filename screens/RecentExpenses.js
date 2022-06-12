import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    //this is a trick to use async in useEffect instead of make useEffect async
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      //get expenses from Firebase and set them to local useContext
      //at the rest of app we will use context instead of getting expenses from firebase.
      //this will avoid unnecessary api calls
      expensesCtx.setExpenses(expenses);
    };
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expenses.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText="No recent expenses."
    />
  );
};

export default RecentExpenses;
