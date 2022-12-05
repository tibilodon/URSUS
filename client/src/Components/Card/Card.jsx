import "./CardStyles.css";
import React from "react";
import bread from "../../Assets/bread.jpg";

const Card = () => {
  return (
    <div style={{ backgroundImage: `url(${bread})` }} className="card-sizer">
      {/* <img src={bread} alt="" /> */}
    </div>
  );
};

export default Card;
