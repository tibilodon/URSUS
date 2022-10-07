import { Alert } from "@mui/material";
import { useState } from "react";
import InputField from "../Components/Input/InputField";
import { useAppContext } from "../Context/appContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, alertText, alertType } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || !isMember || !name) {
      displayAlert();
      return;
    }
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          {!values.isMember && (
            <InputField
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
              labelText="name"
            />
          )}
          <InputField
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            labelText="e-mail"
          />{" "}
          <InputField
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            labelText="password"
          />
          <Button variant="contained" type="submit">
            Belépés
          </Button>
          <div>
            {values.isMember ? "Még nincs regisztrációd?" : "Már regisztráltam"}
            <Button type="button" variant="outlined" onClick={toggleMember}>
              {values.isMember ? "Regisztráció" : "Bejelentkezés"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
