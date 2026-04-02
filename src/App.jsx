import AddIcon from "@mui/icons-material/Add";
import { Box, Container, CssBaseline, Fab, Typography } from "@mui/material";
import { amber, teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import AddSpendDialog from "./components/AddSpendDialog";
import Header from "./components/Header";
import Login from "./components/Login";
import SummaryDashboard from "./components/SummaryDashboard";
import WeeklySpendsList from "./components/WeeklySpendsList";
import WeeklyHistory from "./components/WeeklyHistory";
import { BudgetProvider, useBudget } from "./context/BudgetContext";

const proTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10b981", // Emerald
      light: "#34d399",
      dark: "#059669"
    },
    secondary: {
      main: "#6366f1", // Indigo
      light: "#818cf8",
      dark: "#4f46e5"
    },
    background: {
      default: "#0f172a", // Deep slate
      paper: "#1e293b",   // Lighter slate surface
    },
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    info: { main: "#3b82f6" },
  },
  shape: {
    borderRadius: 16, // Modern rounded corners
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 }, // Remove all-caps buttons
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Remove default MUI surface white-overlay
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", 
          border: "1px solid rgba(255, 255, 255, 0.05)" // Subtle glass rim
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 23, 42, 0.7)", // Transparent glassmorphism for nav
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Pill-like elegant buttons
          padding: "8px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.25)", // Subtle neon hover glow
          }
        }
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
          "&:hover": {
            boxShadow: "0 12px 28px rgba(99, 102, 241, 0.6)", 
          }
        }
      }
    }
  },
});

function App() {
  const [openAddSpend, setOpenAddSpend] = useState(false);

  return (
    <ThemeProvider theme={proTheme}>
      <CssBaseline />
      <BudgetProvider>
        <AuthWrapper setOpenAddSpend={setOpenAddSpend} openAddSpend={openAddSpend} />
      </BudgetProvider>
    </ThemeProvider>
  );
}

// Added AuthWrapper to consume BudgetContext inside the provider
function AuthWrapper({ setOpenAddSpend, openAddSpend }) {
  const { isLoggedIn, checkingAuth } = useBudget();

  if (checkingAuth) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>Loading...</Typography></Box>;
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" sx={{ py: 4, flexGrow: 1 }}>
        <SummaryDashboard />
        <WeeklySpendsList />
        <WeeklyHistory />
      </Container>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => setOpenAddSpend(true)}
      >
        <AddIcon />
      </Fab>
      <AddSpendDialog
        open={openAddSpend}
        handleClose={() => setOpenAddSpend(false)}
      />
    </Box>
  );
}

export default App;
