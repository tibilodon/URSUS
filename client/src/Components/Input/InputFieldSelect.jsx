import "./InputFieldStyles.css";
import { MenuItem, InputLabel, Select } from "@mui/material";

const InputFieldSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="input-select-wrap">
      {/* <label htmlFor="select-opt">geg</label> */}
      <select
        className="input-select-select"
        name={name}
        onChange={handleChange}
        value={value}
        id="select-opt"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
      {/* <InputLabel id={name}>{labelText}</InputLabel>
      <Select value={value} name={name} onChange={handleChange}>
        {list.map((itemValue, index) => {
          return (
            <MenuItem key={index} value={itemValue}>
              {itemValue}
            </MenuItem>
          );
        })}
      </Select> */}
    </div>
  );
};

export default InputFieldSelect;
