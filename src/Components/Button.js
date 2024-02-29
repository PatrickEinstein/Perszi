import * as React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function MyButtons({
  text,
  width,
  onClick,
  startIcon,
  endIcon,
  backgroundColor,
  color,
  fontSize,
  disabled,
  height,
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        // backgroundColor: backgroundColor,
        backgroundColor: "gold",
        width: width,
        height: height,
        fontFamily:"sofia, sans-serif"
      }}
      disabled={disabled}
    >
      <Typography
        style={{ textTransform: "capitalize" }}
        variant="button"
        component="span"
        // color={color}
        color="black"
        fontSize={fontSize}
      >
        {text}
      </Typography>
    </Button>
  );
}
