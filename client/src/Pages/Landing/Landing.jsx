import "./LandingStyles.css";
import img from "../../Assets/parallax.jpg";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="landing-wrapper">
        <header className="bckg-header">
          <img className="background" src={img} alt="baking img" />
          <h1 className="title">Ursus konyhája</h1>
        </header>
        <section className="bckg-section">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illum
            earum dicta reiciendis, corrupti suscipit obcaecati eveniet
            doloremque ipsum laborum rem esse debitis alias, rerum placeat non
            magnam quos mollitia? Totam, iusto optio quas, enim quidem tempora
            obcaecati fuga eveniet aut sit rerum! Eveniet perspiciatis repellat,
            nobis accusamus iure aperiam voluptatibus nulla itaque hic.
            Repellendus odio rem ipsa culpa praesentium tempore eum ea nostrum
            nesciunt at, ratione perspiciatis, quisquam maiores doloribus
            aliquam similique totam blanditiis porro commodi amet provident.
            Debitis id fugit facilis, odit neque nostrum laborum dolorem
            voluptatem exercitationem totam rem et repellat voluptates magnam
            consequuntur eius aspernatur illo.
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
