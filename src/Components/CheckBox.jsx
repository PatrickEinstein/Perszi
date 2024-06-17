import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Checkboxes({ setIsChecked, isChecked }) {
  return (
    <div>
      <Checkbox
        {...label}
        onChange={setIsChecked}
        checked={isChecked}
        inputProps={{ "aria-label": "controlled" }}
        sx={{
          color: "white",
        }}
      />
    </div>
  );
}
