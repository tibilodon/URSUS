import "./MultipleInputStyles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonGroup } from "@mui/material";
import InputField from "../InputField";
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
}) => {
  return (
    <>
      {/* // <div className="multiple-input-wrap not-flex"> */}
      {/* <InputField
        searchLabel={searchLabel}
        name={name}
        value={value}
        handleChange={handleChange}
        type="text"
      /> */}
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={searchLabel}
      />
      <div className="multi-wrap-icon" onClick={addHandler}>
        <BtnOne img={addIcon} />
      </div>
      <div onClick={removeHandler}>
        <BtnOne img={removeIcon} />
      </div>
      {/* <button type="button" onClick={addHandler}>
        <img src={addIcon} alt="" />
      </button>
      <button type="button" onClick={removeHandler}>
        <img src={removeIcon} alt="" />
      </button> */}
      {/* <ButtonGroup sx={{ ml: "1em" }}>
        <Button
          type="button"
          onClick={addHandler}
          endIcon={<AddIcon />}
          variant="contained"
        >
          Hozzávaló
        </Button>
        <Button
          type="button"
          onClick={removeHandler}
          color="secondary"
          endIcon={<DeleteIcon />}
          variant="contained"
        >
          Hozzávaló
        </Button>
      </ButtonGroup> */}
      {/* // </div> */}
    </>
  );
};

export default MultipleInput;
