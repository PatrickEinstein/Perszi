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

const MultiLineTextField = ({ label, onChange, defaultValue, placeholder }) => {
  return (
    <CustomTextField
      id="standard-multiline-static"
      label={label}
      multiline
      rows={5}
      variant="standard"
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
};

export default MultiLineTextField;
