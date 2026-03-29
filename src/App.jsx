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
import { BudgetProvider, useBudget } from "./context/BudgetContext";

const proTheme = createTheme({
  palette: {
    mode: "dark",
    primary: teal,
    secondary: amber,
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
    },
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
