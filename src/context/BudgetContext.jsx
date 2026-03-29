import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useBudget() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Main data points stored in Cloudflare D1
  const [monthlyEarnings, setMonthlyEarningsState] = useState(0);
  const [monthlyExpenses, setMonthlyExpensesState] = useState([]);
  const [extraSpends, setExtraSpendsState] = useState([]);

  // Fetch initial data from our Cloudflare Pages Functions APIs
  useEffect(() => {
    async function fetchData() {
      try {
        const [earningsRes, expensesRes, spendsRes] = await Promise.all([
          fetch("/api/earnings"),
          fetch("/api/monthly-expenses"),
          fetch("/api/extra-spends"),
        ]);

        if (earningsRes.status === 401 || expensesRes.status === 401) {
          setIsLoggedIn(false);
          setCheckingAuth(false);
          return;
        }

        setIsLoggedIn(true);

        if (earningsRes.ok) {
          const data = await earningsRes.json();
          setMonthlyEarningsState(data.amount || 0);
        }
        if (expensesRes.ok) {
          const data = await expensesRes.json();
          setMonthlyExpensesState(data || []);
        }
        if (spendsRes.ok) {
          const data = await spendsRes.json();
          setExtraSpendsState(data || []);
        }
      } catch (error) {
        console.error("Error fetching data from database:", error);
      } finally {
        setCheckingAuth(false);
      }
    }
    fetchData();
  }, [isLoggedIn]); // Refetch if isLoggedIn changes to true

  const handleResponse = (res) => {
    if (res.status === 401) setIsLoggedIn(false);
    return res;
  };

  async function login(username, password) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    setIsLoggedIn(true);
  }

  async function register(username, password) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false);
    setMonthlyEarningsState(0);
    setMonthlyExpensesState([]);
    setExtraSpendsState([]);
  }

  async function setMonthlyEarnings(amount) {
    setMonthlyEarningsState(amount);
    try {
      const res = await fetch("/api/earnings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      handleResponse(res);
    } catch (e) {
      console.error("Error setting monthly earnings", e);
    }
  }

  async function addMonthlyExpense({ item, price, payableTo, period }) {
    const newExpense = {
      id: uuidV4(),
      item,
      price: parseFloat(price),
      payableTo,
      period,
      dateModified: new Date().toISOString(),
    };
    
    setMonthlyExpensesState((prev) => [...prev, newExpense]);
    try {
      const res = await fetch("/api/monthly-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      handleResponse(res);
    } catch (e) {
      console.error("Error adding monthly expense", e);
    }
  }

  async function addExtraSpend({ item, price }) {
    const newSpend = {
      id: uuidV4(),
      item,
      price: parseFloat(price),
      date: new Date().toISOString(),
    };
    
    setExtraSpendsState((prev) => [...prev, newSpend]);
    try {
      const res = await fetch("/api/extra-spends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpend),
      });
      handleResponse(res);
    } catch (e) {
      console.error("Error adding extra spend", e);
    }
  }

  async function deleteMonthlyExpense(id) {
    setMonthlyExpensesState((prev) => prev.filter((exp) => exp.id !== id));
    try {
      const res = await fetch(`/api/monthly-expenses/${id}`, { method: "DELETE" });
      handleResponse(res);
    } catch (e) {
      console.error("Error deleting monthly expense", e);
    }
  }

  async function deleteExtraSpend(id) {
    setExtraSpendsState((prev) => prev.filter((exp) => exp.id !== id));
    try {
      const res = await fetch(`/api/extra-spends/${id}`, { method: "DELETE" });
      handleResponse(res);
    } catch (e) {
      console.error("Error deleting extra spend", e);
    }
  }

  const value = {
    isLoggedIn,
    checkingAuth,
    login,
    register,
    logout,
    monthlyEarnings,
    setMonthlyEarnings,
    monthlyExpenses,
    addMonthlyExpense,
    deleteMonthlyExpense,
    extraSpends,
    addExtraSpend,
    deleteExtraSpend,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

