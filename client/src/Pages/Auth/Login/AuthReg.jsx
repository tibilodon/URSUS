import "./AuthStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg.jpg";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../../../Components/Alert/Alert";
import { useAppContext } from "../../../Context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const AuthReg = () => {
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
    const { name, email, password } = values;
    if (!email || !password || !name) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };

    setupUser({
      currentUser,
      endPoint: "register",
      alertText: "Regisztráció sikeres! Kis türemlet...",
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
        {/* <div className="login-paper"> */}
        <form onSubmit={onSubmit} className="login-paper" action="">
          <img src={ursus} alt="" />

          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="név"
          />
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
            Regisztráció
          </button>

          <div className="auth-no">
            <h3>Regisztráltál?</h3>
            <Link to={"/login"}>
              <button className="button-auth reg">Bejelentkezés</button>
            </Link>
          </div>
        </form>
        {/* </div> */}
      </div>
    </>
  );
};

export default AuthReg;
