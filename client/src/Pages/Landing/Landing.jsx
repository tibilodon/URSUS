import "./LandingStyles.css";
import img from "../../Assets/parallax.jpg";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="landing-wrapper">
        {/* <header className="bckg-header">
          <img className="background" src={img} alt="baking img" />
        </header> */}
        <div className="parallax">
          {" "}
          <h1 className="title">Ursus konyhája</h1>
        </div>
        <section className="bckg-section">
          <p>
            Az oldal csak regisztrált felhasználók részre elérhető. Kérlek,
            regisztrálj vagy jelentkezz be az alábbi gomb segítségével.
          </p>
          <div className="landing-btn">
            <Link to="/register">
              <Button variant="contained">Regisztráció / Bejelentkezés</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
