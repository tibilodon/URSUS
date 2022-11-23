import "./MultipleInputStyles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonGroup } from "@mui/material";
import InputField from "../InputField";
const MultipleInput = ({
  addHandler,
  removeHandler,
  type,
  name,
  value,
  handleChange,
  hidden,
  labelText,
  searchLabel,
}) => {
  return (
    <div className="multiple-input-wrap not-flex">
      <InputField
        searchLabel={searchLabel}
        name={name}
        value={value}
        handleChange={handleChange}
        type="text"
      />
      <ButtonGroup sx={{ ml: "1em" }}>
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
      </ButtonGroup>
    </div>
  );
};

export default MultipleInput;
