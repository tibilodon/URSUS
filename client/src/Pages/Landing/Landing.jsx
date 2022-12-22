import "./LandingStyles.css";

import { Link } from "react-router-dom";
import home from "../../Assets/home-ico.svg";
import BtnOne from "../../Components/Buttons/BtnOne";

const Landing = () => {
  return (
    <>
      <div className="landing-wrapper">
        <div className="parallax">
          <h1 className="title">Ursus konyhája</h1>
        </div>
        <section className="bckg-section">
          <p>
            Az oldal fejlesztés alatt, egyes funkciók csak regisztrált
            felhasználók részre elérhetőek. Kérlek, regisztrálj / jelentkezz be,
            vagy látogass el a főoldalra a megfelelő gomb segítségével.
          </p>
          <div className="landing-btn">
            <Link to="/register">
              <BtnOne text={"Regisztráció"} bgCol="orange" />
            </Link>{" "}
            <Link to="/register">
              <BtnOne text={"Bejelentkezés"} bgCol="green" />
            </Link>
          </div>
          <div className="icon-hover">
            <Link to="/">
              <img src={home} alt="" />
            </Link>
          </div>
        </section>
        <footer className="version-footer">v2.0.1</footer>
      </div>
    </>
  );
};

export default Landing;
