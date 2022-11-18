import "./LandingStyles.css";
import img from "../../Assets/parallax.jpg";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CottageIcon from "@mui/icons-material/Cottage";
import {
  Toolbar,
  AppBar,
  createTheme,
  Typography,
  Drawer,
  Box,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";

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
            Az oldal fejlesztés alatt, egyes funkciók csak regisztrált
            felhasználók részre elérhetőek. Kérlek, regisztrálj / jelentkezz be,
            vagy látogass el a főoldalra az alábbi gombok segítségével.
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
                {/* {user && user.name} */}
              </IconButton>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
