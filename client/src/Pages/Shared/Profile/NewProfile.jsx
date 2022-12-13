import "./ProfileStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg_50.jpg";
import React from "react";

const NewProfile = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="new-profile-wrap"
      >
        <div className="login-paper">
          <img src={ursus} alt="" />
          <h1>Profilom</h1>
          <input type="text" placeholder="keresztnév" />
          <input type="email" placeholder="vezetéknév" />
          <input type="email" placeholder="e-mail" />
          <button className="button-auth">Mentés</button>
        </div>
      </div>
    </>
  );
};

export default NewProfile;
