import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HomeRepairServiceIcon sx={{ marginRight: "5px", fontSize: 34 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Avatar src="/broken-image.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
