import { NavLink } from "react-router-dom";
import links from "../Utils/links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div>
      {links.map(link => {
        const { id, text, path, icon } = link;
        return (
          <NavLink to={path} key={id} onClick={toggleSidebar}>
            <span>{icon}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
