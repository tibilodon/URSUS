import "./RegisterStyles.css";

import { Alert } from "@mui/material";
import InputField from "../../Components/Input/InputField";
import { useAppContext } from "../../Context/appContext";

//mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,
    alertText,
    alertType,
    user,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User created, redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <>
      <div className="reg-wrapper">
        <div>
          {showAlert}
          {alertType}
          {alertText}
        </div>
        <Container maxWidth="sm">
          <Box
            sx={{
              boxShadow: 3,
              height: "100vh",
              bgcolor: "#E8EDE7",
              // bgcolor: "#cfe8fc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={onSubmit}>
              <div className="form-items">
                <h3 className="reg-header">
                  {values.isMember ? "Bejelentkezés" : "Regisztráció"}
                </h3>
                {/* {showAlert && <Alert />} */}
                {!values.isMember && (
                  <InputField
                    sx={{ m: "1em" }}
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                    labelText="name"
                  />
                )}
                <InputField
                  sx={{ m: "1em" }}
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
                <Button
                  disabled={isLoading}
                  sx={{ m: "1em" }}
                  variant="contained"
                  type="submit"
                >
                  Tovább
                </Button>
              </div>
              <div className="reg-option ">
                {values.isMember
                  ? "Még nincs regisztrációd?"
                  : "Már regisztráltam"}
                <div className="reg-button ">
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={toggleMember}
                  >
                    {values.isMember ? "Regisztráció" : "Bejelentkezés"}
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;
