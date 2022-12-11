import "./SidebarStyles.css";
import { useState } from "react";
import menu from "../../Assets/menu_ico.svg";

const Sidebar = () => {
  const [active, setActive] = useState(false);
  const handleTest = e => {
    e.preventDefault();
    setActive(!active);
  };
  return (
    <>
      <div onClick={handleTest} className="sidebar">
        <img src={menu} alt="" />
      </div>

      <div onClick={handleTest} className={active ? "sidebar-menu" : "off"}>
        <div className="sidebar-sizer">
          <span>receptek</span>
          <span>receptek</span>
          <span>receptek</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
