import "./SidebarStyles.css";
import { useState } from "react";
import menu from "../../Assets/menu_ico.svg";
//icons
import addIco from "../../Assets/add_ico.svg";
import myRecipesIco from "../../Assets/my-recipes_ico.svg";
import allRecipesIco from "../../Assets/all-recipes_ico.svg";
import closeSquare from "../../Assets/close-x_ico.svg";
// import closeSquare from "../../Assets/close-square_ico.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const pathMatchRoute = route => {
    if (route === location.pathname) {
      return true;
    }
  };
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = e => {
    e.preventDefault();
    setSidebar(!sidebar);
  };

  const handleClose = path => {
    setSidebar(false);
    navigate(`${path}`);
  };

  return (
    <>
      <div className="sidebar">
        <img onClick={handleSidebar} src={menu} alt="" />
        {sidebar ? (
          <div className={"sidebar-menu"}>
            <div className={"sidebar-sizer"}>
              <div className="close-ico">
                <img onClick={handleSidebar} src={closeSquare} alt="" />
              </div>
              <div className="sidebar-items-wrap">
                <div
                  // onClick={() => navigate("/all-recipes")}
                  onClick={e => handleClose("/all-recipes")}
                  className="sidebar-items"
                >
                  <img
                    className={pathMatchRoute("/all-recipes") ? "path" : null}
                    src={allRecipesIco}
                    alt=""
                  />
                  <h3>Receptek</h3>
                </div>{" "}
                <div
                  // onClick={() => navigate("/")}
                  onClick={() => handleClose("/")}
                  className="sidebar-items"
                >
                  <img
                    className={pathMatchRoute("/") ? "path" : null}
                    src={myRecipesIco}
                    alt=""
                  />
                  <h3>Receptjeim</h3>
                </div>{" "}
                <div
                  // onClick={() => navigate("/add-recipe")}
                  onClick={() => handleClose("/add-recipe")}
                  className="sidebar-items"
                >
                  <img
                    className={pathMatchRoute("/add-recipe") ? "path" : null}
                    src={addIco}
                    alt=""
                  />
                  <h3>Új recept</h3>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* <div className={sidebar ? "sidebar-menu" : "off"}>
          <div className="sidebar-sizer">
            <div className="sidebar-items">
              <img src={allRecipesIco} alt="" />
              <h3>Receptek</h3>
            </div>{" "}
            <div className="sidebar-items">
              <img src={myRecipesIco} alt="" />
              <h3>Receptjeim</h3>
            </div>{" "}
            <div className="sidebar-items">
              <img src={addIco} alt="" />
              <h3>Új recept</h3>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
