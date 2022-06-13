import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    //this is a trick to use async in useEffect instead of make useEffect async
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("An error occured. Try again later!");
      }
      setIsFetching(false);
      //get expenses from Firebase and set them to local useContext
      //at the rest of app we will use context instead of getting expenses from firebase.
      //this will avoid unnecessary api calls
    };
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expenses.date > date7DaysAgo;
  });

  if (isFetching) {
    return <LoadingOverlay />;
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText="No recent expenses."
    />
  );
};

export default RecentExpenses;
