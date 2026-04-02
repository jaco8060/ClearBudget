import { Grid, Box } from "@mui/material";
import React from "react";
import { useBudget } from "../context/BudgetContext";
import { isDateInCurrentWeek, getDaysLeftInCurrentWeek } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatters";
import StatCard from "./StatCard";
import SpendingChart from "./SpendingChart";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function SummaryDashboard() {
  const { monthlyEarnings, monthlyExpenses, extraSpends } = useBudget();

  // --- Calculations ---
  const actualExpenses = monthlyExpenses.filter(e => e.period !== "savings");
  const savings = monthlyExpenses.filter(e => e.period === "savings");

  const totalMonthlyExpenses = actualExpenses.reduce(
    (total, exp) => total + exp.price,
    0
  );
  const totalMonthlySavings = savings.reduce(
    (total, exp) => total + exp.price,
    0
  );

  const weeklyEarnings = monthlyEarnings / 4;
  const weeklyExpenses = totalMonthlyExpenses / 4;
  const weeklySavings = totalMonthlySavings / 4;
  const weeklyAllowance = weeklyEarnings - weeklyExpenses - weeklySavings;
  const totalExtraSpendsThisWeek = extraSpends
    .filter((spend) => isDateInCurrentWeek(spend.date))
    .reduce((total, spend) => total + spend.price, 0);
  const availableToSpend = weeklyAllowance - totalExtraSpendsThisWeek;

  const availableColor = availableToSpend >= 0 ? "success.main" : "error.main";

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <StatCard
            title={`Available to Spend This Week (${getDaysLeftInCurrentWeek()} days left)`}
            value={formatCurrency(availableToSpend)}
            icon={<AccountBalanceWalletIcon />}
            color={availableColor}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StatCard
                title="Weekly Earnings"
                value={formatCurrency(weeklyEarnings)}
                icon={<TrendingUpIcon />}
                color="primary.main"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatCard
                title="Weekly Recurring"
                value={formatCurrency(weeklyExpenses)}
                icon={<TrendingDownIcon />}
                color="warning.main"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      {/* 📊 NEW CHART GOES HERE */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <SpendingChart 
            weeklyExpenses={weeklyExpenses} 
            weeklySavings={weeklySavings}
            extraSpendsThisWeek={totalExtraSpendsThisWeek} 
            remaining={availableToSpend} 
          />
        </Grid>
      </Grid>
    </Box>
  );
}
