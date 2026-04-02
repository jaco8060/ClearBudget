import React from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useBudget } from "../context/BudgetContext";
import { formatCurrency } from "../utils/formatters";
import { getStartOfWeek, isDateInCurrentWeek } from "../utils/dateUtils";

export default function WeeklyHistory() {
  const { monthlyEarnings, monthlyExpenses, extraSpends } = useBudget();
  
  // Calculate weekly budget
  const totalMonthlyExpenses = monthlyExpenses.reduce((total, exp) => total + exp.price, 0);
  const weeklyEarnings = monthlyEarnings / 4;
  const weeklyExpenses = totalMonthlyExpenses / 4;
  const weeklyAllowance = weeklyEarnings - weeklyExpenses;

  // Filter out current week's spends
  const pastSpends = extraSpends.filter(spend => !isDateInCurrentWeek(spend.date));

  // Group by week start date
  const weeks = {};
  pastSpends.forEach(spend => {
    const startOfWeek = getStartOfWeek(spend.date).toISOString().split('T')[0];
    if (!weeks[startOfWeek]) {
      weeks[startOfWeek] = 0;
    }
    weeks[startOfWeek] += spend.price;
  });

  const sortedWeeks = Object.keys(weeks).sort((a, b) => new Date(b) - new Date(a));

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Previous Weeks History
      </Typography>
      {sortedWeeks.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No past weeks' spending history found.
          </Typography>
        </Box>
      ) : (
        <List>
          {sortedWeeks.map((weekStart, index) => {
            const spent = weeks[weekStart];
            const remaining = weeklyAllowance - spent;
            const remainingColor = remaining >= 0 ? "success.main" : "error.main";
            
            // Format week start to a readable string
            const weekDate = new Date(weekStart);
            // Fix timezone discrepancy for display
            const adjustedDate = new Date(weekDate.getTime() + weekDate.getTimezoneOffset() * 60000);
            const formattedWeek = adjustedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <React.Fragment key={weekStart}>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", py: 2 }}>
                  <ListItemText 
                    primary={`Week of ${formattedWeek}`} 
                    secondary={`Spent: ${formatCurrency(spent)}`}
                  />
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                      Budget: {formatCurrency(weeklyAllowance)}
                    </Typography>
                    <Typography variant="body1" color={remainingColor} fontWeight="bold">
                      {remaining >= 0 ? 'Remaining' : 'Overspent'}: {formatCurrency(Math.abs(remaining))}
                    </Typography>
                  </Box>
                </ListItem>
                {index < sortedWeeks.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
