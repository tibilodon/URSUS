import "./LandingStyles.css";

import { Link } from "react-router-dom";
import CottageIcon from "@mui/icons-material/Cottage";
import { IconButton, Button } from "@mui/material";

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
              <Button variant="contained">Regisztráció / Bejelentkezés</Button>
            </Link>
          </div>
          <div className="icon-hover">
            <Link to="/">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <CottageIcon sx={{ mr: "0.3em" }} fontSize="large" />
              </IconButton>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
