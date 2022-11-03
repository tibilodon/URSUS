import "./MultipleInputStyles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonGroup } from "@mui/material";
import InputField from "../InputField";
const MultipleInput = () => {
  return (
    <div>
      MultipleInput
      <InputField labelText="labeltext" type="text" />
      <ButtonGroup>
        <Button
          type="button"
          // onClick={addHandler}
          endIcon={<AddIcon />}
          variant="contained"
        >
          Hozzávaló
        </Button>
        <Button
          type="button"
          // onClick={removeHandler}
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
