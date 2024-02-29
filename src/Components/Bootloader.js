import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function BootLoader({ open, handleClose }) {
  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust opacity for the blur effect
        backdropFilter: "blur(1px)", // Apply blur effect to the background
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
