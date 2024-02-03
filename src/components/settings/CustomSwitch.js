import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const CustomSwitch = ({ field }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.value}
          onChange={field.onChange}
          name={field.name}
        />
      }
      label={field.label}
      style={{ marginLeft: "16px" }} // Apply custom styles directly
    />
  );
};

export default CustomSwitch;
