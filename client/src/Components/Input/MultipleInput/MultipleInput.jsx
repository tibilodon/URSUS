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
  btnType,
}) => {
  return (
    <>
      {/* <div className="multiple-input-wrap not-flex">
        <InputField
          searchLabel={searchLabel}
          name={name}
          value={value}
          handleChange={handleChange}
          type="text"
        />

        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={searchLabel}
        /> */}

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

      {/* <ButtonGroup sx={{ ml: "1em" }}>
          <Button
            type="button"
            onClick={addHandler}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Hozzávaló
          </Button>
          <button type="button" onClick={addHandler}>
            +add
          </button>

          <Button
            type="button"
            onClick={removeHandler}
            color="secondary"
            endIcon={<DeleteIcon />}
            variant="contained"
          >
            Hozzávaló
          </Button>
        </ButtonGroup>
      </div> */}
    </>
  );
};

export default MultipleInput;
