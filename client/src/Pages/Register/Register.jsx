import "./RegisterStyles.css";

import InputField from "../../Components/Input/InputField";
import { useAppContext } from "../../Context/appContext";

//mui
import { Button, Box, Container } from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../Components/Alert/Alert";

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
        alertText: "Bejelentkezés sikeres! Kis türemlet...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Regisztráció sikeres! Kis türemlet...",
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

  if (showAlert) {
    return <Alert />;
  }

  return (
    <>
      <div className="reg-wrapper">
        {/* <div>
          {showAlert}
          {alertType}
          {alertText}
        </div> */}
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
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                    searchLabel="név"
                  />
                )}
                <InputField
                  sx={{ m: "1em" }}
                  type="email"
                  name="email"
                  value={values.email}
                  handleChange={handleChange}
                  searchLabel="e-mail"
                />{" "}
                <InputField
                  type="password"
                  name="password"
                  value={values.password}
                  handleChange={handleChange}
                  searchLabel="jelszó"
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
