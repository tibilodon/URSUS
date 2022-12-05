import "./CardStyles.css";
import React from "react";
import bread from "../../Assets/bread.jpg";
import time from "../../Assets/time.svg";
import difficulty from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";

const Card = () => {
  return (
    <div style={{ backgroundImage: `url(${bread})` }} className="card-sizer">
      <div className="card-upper">
        <div className="card-difficulty">
          <img className="card-ico" src={difficulty} alt="" />
          <h1>difficulty</h1>
        </div>
        <div className="card-type">
          <img className="card-ico" src={recType} alt="" />
          <h1>type</h1>
        </div>
      </div>
      <div className="card-downer">
        <div className="card-title">
          <h1>me likey bread</h1>
        </div>
        <div className="card-time">
          <img className="card-ico" src={time} alt="" />
          <h1>time</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
