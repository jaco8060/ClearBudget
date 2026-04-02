import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingDialog from "./SettingDialog";
import LogoIcon from "./LogoIcon";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LogoIcon sx={{ mr: 2, color: '#10b981' }} fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClearBudget
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenSettings(true)}>
            <SettingsIcon />
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
