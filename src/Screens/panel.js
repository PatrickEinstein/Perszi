import React from "react";
import { ReactDOM } from "react";
import Sidebar from "./Components/sidebar";
import { Stack, Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Mainboard from "../Components/mainboard";

function Panel() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        margin: 3,
        height: "auto",
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: 600,
          marginTop: 1,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#DFF6FF",
          }}
        >
          <Sidebar />
        </Paper>
      </Box>
      <Box
        sx={{
          width: "77%",
          height: 600,
          backgroundColor: "aqua",
          marginTop: 1,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#dff6ff",
          }}
        >
          <Mainboard />
        </Paper>
      </Box>
    </Stack>
  );
}

export default Panel;
