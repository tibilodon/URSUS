import "./InputFieldStyles.css";

const InputFieldSelect = ({  name, value, handleChange, list }) => {
  return (
    <div className="input-select-wrap">
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
   
    </div>
  );
};

export default InputFieldSelect;
