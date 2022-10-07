import React from "react";
import "./InputFieldStyles.css";
//mui
import TextField from "@mui/material/TextField";

const InputField = ({ type, name, value, handleChange, labelText }) => {
  return (
    <>
      <div className="input-wrap">
        <TextField
          id={name}
          label={labelText || name}
          variant="filled"
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InputField;
