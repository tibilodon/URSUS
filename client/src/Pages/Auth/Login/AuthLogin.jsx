import "./AuthStyles.css";
import React from "react";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg.jpg";
import { useEffect } from "react";

const AuthLogin = () => {
  useEffect(() => {}, [bgImage]);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="login-wrap"
      >
        <div className="login-paper">
          <img src={ursus} alt="" />

          <input type="email" placeholder="e-mail" />
          <input type="password" placeholder="jelszó" />
          <button className="button-auth">Bejelentkezés</button>
          <div className="auth-no">
            <h3>Még nincs regisztrációd?</h3>
            <button className="button-auth reg">Regisztráció</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLogin;
