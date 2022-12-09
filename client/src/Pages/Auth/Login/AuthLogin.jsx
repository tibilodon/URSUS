import "./AuthStyles.css";
import React from "react";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg.jpg";

import { useAppContext } from "../../../Context/appContext";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../../../Components/Alert/Alert";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,

    user,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      displayAlert();
      return;
    }
    const currentUser = { email, password };

    setupUser({
      currentUser,
      endPoint: "login",
      alertText: "Bejelentkezés sikeres! Kis türemlet...",
    });
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
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="login-wrap"
      >
        <form onSubmit={onSubmit} className="login-paper">
          <img src={ursus} alt="" />

          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            placeholder="e-mail"
          />
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="jelszó"
          />
          <button type="submit" className="button-auth">
            Bejelentkezés
          </button>
          <div className="auth-no">
            <h3>Még nincs regisztrációd?</h3>
            <Link to={"/register"}>
              <button className="button-auth reg">Regisztráció</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthLogin;
