import "./AuthStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg.jpg";

const AuthReg = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="login-wrap"
      >
        <div className="login-paper">
          <img src={ursus} alt="" />

          <input type="text" placeholder="név" />
          <input type="email" placeholder="e-mail" />
          <input type="password" placeholder="jelszó" />
          <button className="button-auth">Regisztráció</button>
          <div className="auth-no">
            <h3>Regisztráltál?</h3>
            <button className="button-auth reg">Bejelentkezés</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthReg;
