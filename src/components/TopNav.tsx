"use client";

import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function TopNav() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sandbox SaaS
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} href="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/forgot-password">
            Forgot
          </Button>
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
