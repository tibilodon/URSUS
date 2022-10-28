import "./InputFieldStyles.css";
import { useState } from "react";
import { MenuItem, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const InputFieldSelect = ({ labelText, name, value, handleChange, list }) => {
  const [handleValue, setHandleValue] = useState(value);

  const handleChanges = e => {
    setHandleValue(e.target.value);
  };
  return (
    <div className="input-wrap">
      <InputLabel id={name}>{labelText || name}</InputLabel>
      <Select
        // labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={handleValue}
        label={name}
        onChange={handleChanges}
      >
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
