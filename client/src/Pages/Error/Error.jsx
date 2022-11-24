import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./ErrorStyles.css";

const Error = () => {
  return (
    <>
      <div className="error-text">
        <div className="error-items">
          <h1>Hiba! Az oldal nem található</h1>
          <div className="error-btn">
            <Link to="/">
              <Button variant="outlined">Vissza a főoldalra</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
