import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useBudget } from "../context/BudgetContext";
import { isDateInCurrentWeek } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatters";

export default function WeeklySpendsList() {
  const { extraSpends, deleteExtraSpend } = useBudget();
  const spendsThisWeek = extraSpends
    .filter((spend) => isDateInCurrentWeek(spend.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" gutterBottom>
        This Week's Spending Log
      </Typography>

      {spendsThisWeek.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No spending recorded yet this week.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click the '+' button to add your first expense!
          </Typography>
        </Box>
      ) : (
        spendsThisWeek.map((spend, index) => (
          <React.Fragment key={spend.id}>
            {index > 0 && <Divider />}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1.5,
                gap: 1.5,
                overflow: "hidden",
              }}
            >
              {/* Icon */}
              <Avatar sx={{ bgcolor: "primary.light", width: 36, height: 36, flexShrink: 0 }}>
                <ReceiptLongIcon fontSize="small" />
              </Avatar>

              {/* Text — grows, clips overflow */}
              <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {spend.item}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(spend.date).toLocaleDateString()}
                </Typography>
              </Box>

              {/* Price + delete — never shrinks */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {formatCurrency(spend.price)}
                </Typography>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => deleteExtraSpend(spend.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </React.Fragment>
        ))
      )}
    </Paper>
  );
}
