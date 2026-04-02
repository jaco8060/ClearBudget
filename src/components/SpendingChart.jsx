import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SpendingChart({ weeklyExpenses, weeklySavings, extraSpendsThisWeek, remaining }) {
  const theme = useTheme();

  // Create data points for our chart based on weekly numbers
  const data = [
    { name: 'Recurring Expenses', value: Math.max(0, weeklyExpenses) },
    { name: 'Extra Spends', value: Math.max(0, extraSpendsThisWeek) },
    { name: 'Savings Target', value: Math.max(0, weeklySavings) },
  ];

  // Only show remaining if it's positive
  if (remaining > 0) {
    data.push({ name: 'Remaining Budget', value: remaining });
  }

  // Define vibrant colors matching our Material UI palette conceptually
  const COLORS = [
    theme.palette.warning.main, // Orange/Yellow for expenses
    theme.palette.error.main,   // Red for extra spends
    theme.palette.info.main,    // Blue for savings target
    theme.palette.success.main  // Green for remaining money
  ];

  return (
    <Paper sx={{ p: 3, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Weekly Spending Breakdown
      </Typography>
      
      {/* Recharts responsive wrapper */}
      <Box sx={{ width: '100%', height: 350, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 0, bottom: 30, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: theme.palette.background.paper, border: 'none', borderRadius: 8 }} 
            />
            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
