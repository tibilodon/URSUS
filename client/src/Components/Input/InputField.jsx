import React from "react";
import "./InputFieldStyles.css";
//mui
import { TextField, InputLabel } from "@mui/material";

const InputField = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  sx,
  searchLabel,
  required,
}) => {
  return (
    <>
      <div className="input-wrap">
        <InputLabel sx={{ textAlign: "center" }} id={name}>
          {labelText}
        </InputLabel>
        <TextField
          id={name}
          label={labelText || searchLabel}
          variant="filled"
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          sx={sx}
        />
      </div>
    </>
  );
};

export default InputField;
