import React, { Component } from "react";
import { styled } from "@mui/system";
import { Box, Stack, TextField, Typography } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "black", // Change the color of the label text
  },
  "& .MuiInputBase-input": {
    color: "black", // Change the color of the input text
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black", // Change the color of the outline when not focused
    },
    "&:hover fieldset": {
      borderColor: "black", // Change the color of the outline on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Change the color of the outline when focused
    },
  },
  width: "80%",
}));

const TextBox = ({ label, onChange }) => {
  return (
    <CustomTextField
      id="outlined-basic2"
      label={label}
      variant="outlined"
      onChange={onChange}
    />
  );
};

export default TextBox;
