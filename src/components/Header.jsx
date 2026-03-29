import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingDialog from "./SettingDialog";
import { useBudget } from "../context/BudgetContext";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  const { logout } = useBudget();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceWalletIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Budget Tracker
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenSettings(true)} sx={{ mr: 1 }}>
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SettingDialog
        open={openSettings}
        handleClose={() => setOpenSettings(false)}
      />
    </>
  );
}
