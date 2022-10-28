import "./InputFieldStyles.css";
import { useState } from "react";
import { MenuItem, InputLabel, Select } from "@mui/material";

const InputFieldSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div>
      <InputLabel id={name}>{labelText || name}</InputLabel>
      <Select value={value} name={name} onChange={handleChange}>
        {list.map((itemValue, index) => {
          return (
            <MenuItem key={index} value={itemValue}>
              {itemValue}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default InputFieldSelect;
