import "./CardStyles.css";
import { useState } from "react";
import bread from "../../Assets/bread.jpg";
import time from "../../Assets/time.svg";
import difficulty from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";
import CardModal from "../Modal/CardModal";

const Card = () => {
  const [modal, setModal] = useState(false);
  const modalHandler = e => {
    e.preventDefault();
    setModal(!modal);
  };
  return (
    <div
      onClick={modalHandler}
      // style={{ backgroundImage: `url(${bread})` }}
      className="card-sizer"
    >
      <CardModal modal={modal} />
      <div className="card-upper">
        <div className="card-difficulty">
          <img className="card-ico" src={difficulty} alt="" />
          <h1>közepes</h1>
        </div>
        <div className="card-type">
          <img className="card-ico" src={recType} alt="" />
          <h1>desszert</h1>
        </div>
      </div>
      <div className="card-downer">
        <div className="card-title">
          <h1>me likey bread</h1>
        </div>
        <div className="card-time">
          <img className="card-ico" src={time} alt="" />
          <h1>2 óra 27 perc</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
