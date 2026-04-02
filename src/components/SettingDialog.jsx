import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, // Import Stack for responsive layout
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useBudget } from "../context/BudgetContext";
import { formatCurrency } from "../utils/formatters";

export default function SettingDialog({ open, handleClose }) {
  const {
    monthlyEarnings,
    setMonthlyEarnings,
    monthlyExpenses,
    addMonthlyExpense,
    deleteMonthlyExpense,
  } = useBudget();

  const earningsRef = useRef();
  const expenseItemRef = useRef();
  const expensePriceRef = useRef();
  const savingsItemRef = useRef();
  const savingsPriceRef = useRef();

  const actualExpenses = monthlyExpenses.filter(e => e.period !== "savings");
  const savingsGoals = monthlyExpenses.filter(e => e.period === "savings");

  function handleSaveSettings() {
    const newEarnings = parseFloat(earningsRef.current.value);
    if (!isNaN(newEarnings)) {
      setMonthlyEarnings(newEarnings);
    }
    handleClose();
  }

  function handleAddExpense(e) {
    e.preventDefault();
    if (expenseItemRef.current.value && expensePriceRef.current.value) {
      addMonthlyExpense({
        item: expenseItemRef.current.value,
        price: expensePriceRef.current.value,
        payableTo: "", // You can add fields for this if needed
        period: "monthly",
      });
      // Clear the form fields after submission
      expenseItemRef.current.value = "";
      expensePriceRef.current.value = "";
    }
  }

  function handleAddSavings(e) {
    e.preventDefault();
    if (savingsItemRef.current.value && savingsPriceRef.current.value) {
      addMonthlyExpense({
        item: savingsItemRef.current.value,
        price: savingsPriceRef.current.value,
        payableTo: "",
        period: "savings",
      });
      savingsItemRef.current.value = "";
      savingsPriceRef.current.value = "";
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Budget Settings</DialogTitle>
      <DialogContent>
        {/* Section 1: Monthly Earnings */}
        <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
          Monthly Earnings
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enter your total net income for the month.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Set Your Monthly Earnings"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue={monthlyEarnings}
          inputRef={earningsRef}
          inputProps={{ step: "0.01" }}
        />

        <Divider sx={{ my: 4 }} />

        {/* Section 2: Monthly Recurring Expenses */}
        <Typography variant="h6" component="h3">
          Monthly Recurring Expenses
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Add fixed monthly costs like rent, utilities, or subscriptions.
        </Typography>
        <List>
          {actualExpenses.map((exp) => (
            <ListItem key={exp.id} disablePadding>
              <ListItemText
                primary={exp.item}
                secondary={formatCurrency(exp.price)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteMonthlyExpense(exp.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Form to add a new recurring expense */}
        <Box component="form" onSubmit={handleAddExpense} sx={{ mt: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              label="Expense Item"
              variant="outlined"
              inputRef={expenseItemRef}
              required
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              inputRef={expensePriceRef}
              required
              inputProps={{ step: "0.01" }}
              sx={{ width: { xs: "100%", sm: 180 } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Add
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Section 3: Monthly Savings */}
        <Typography variant="h6" component="h3">
          Monthly Savings Goals
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Set aside money for savings securely.
        </Typography>
        <List>
          {savingsGoals.map((exp) => (
            <ListItem key={exp.id} disablePadding>
              <ListItemText
                primary={exp.item}
                secondary={formatCurrency(exp.price)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteMonthlyExpense(exp.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box component="form" onSubmit={handleAddSavings} sx={{ mt: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              label="Savings Target"
              variant="outlined"
              inputRef={savingsItemRef}
              required
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              inputRef={savingsPriceRef}
              required
              inputProps={{ step: "0.01" }}
              sx={{ width: { xs: "100%", sm: 185 } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveSettings} variant="contained">
          Save & Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
