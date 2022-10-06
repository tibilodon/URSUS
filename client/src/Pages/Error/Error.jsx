import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import img from "../../Assets/error.svg";
import "./ErrorStyles.css";

const Error = () => {
  return (
    <>
      <div className="error-text">
        <h1>Hiba! Az oldal nem található</h1>
        <div className="error-btn">
          <Link to="/">
            <Button variant="outlined">Vissza a főoldalra</Button>
          </Link>
        </div>
      </div>
      <div className="error-wrap">
        <img src={img} alt="error page" />
      </div>
    </>
  );
};

export default Error;
