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
  label,
}) => {
  return (
    <div
    // hidden={hidden}
    >
      <InputField
        // labelText={label}
        name={name}
        value={value}
        handleChange={handleChange}
        type="text"
      />
      <ButtonGroup>
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
