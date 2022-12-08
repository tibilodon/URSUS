import "./AuthStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg.jpg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../Components/Alert/Alert";
import { useAppContext } from "../../../Context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
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
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="login-wrap"
      >
        {/* <div className="login-paper"> */}
        <form onSubmit={onSubmit} className="login-paper" action="">
          <img src={ursus} alt="" />

          <input type="text" placeholder="név" />
          <input type="email" placeholder="e-mail" />
          <input type="password" placeholder="jelszó" />
          <button className="button-auth">Regisztráció</button>
          <div className="auth-no">
            <h3>Regisztráltál?</h3>
            <button className="button-auth reg">Bejelentkezés</button>
          </div>
        </form>
        {/* </div> */}
      </div>
    </>
  );
};

export default AuthReg;
