import { Stack, Typography } from "@mui/material";
import React from "react";

function Settings() {
  return (
    <Stack
    sx={{
      height:800,
      width:800,
    }}
    >
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
        }}
      >
        Settings
      </Typography>
    </Stack>
  );
}

export default Settings;
