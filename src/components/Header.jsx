import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingDialog from "./SettingDialog";
import { useBudget } from "../context/BudgetContext";
import LogoIcon from "./LogoIcon";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  const { logout } = useBudget();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LogoIcon sx={{ mr: 2, color: '#10b981' }} fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClearBudget
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
