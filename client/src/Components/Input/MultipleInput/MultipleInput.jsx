import "./MultipleInputStyles.css";
import addIcon from "../../../Assets/add-ing_ico.svg";
import removeIcon from "../../../Assets/remove-ing_ico.svg";
import BtnOne from "../../Buttons/BtnOne";
const MultipleInput = ({
  addHandler,
  removeHandler,
  name,
  value,
  handleChange,
  searchLabel,
  btnType,
}) => {
  return (
    <>
      <div className="multiple-wrap">
        <div className="add-input">
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={searchLabel}
          />
        </div>
        <div className="multiple-btn">
          <div className="multi-wrap-icon" onClick={addHandler}>
            <BtnOne btnType={btnType} img={addIcon} />
          </div>
          <div className="multi-wrap-icon" onClick={removeHandler}>
            <BtnOne btnType={btnType} img={removeIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleInput;
