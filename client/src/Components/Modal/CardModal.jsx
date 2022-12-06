import "./CardModalStyles.css";
import bread from "../../Assets/bread.jpg";
import time from "../../Assets/time.svg";
import difficulty from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";

import React from "react";

const CardModal = ({ modal }) => {
  return (
    <>
      <div className={modal ? "modal-wrap " : "modal-off"}>
        <div className="modal-sizer">
          <div className="modal-icons">
            <div className="modal-difficulty">
              <img className="modal-ico" src={difficulty} alt="" />
              <h1>közepes</h1>
            </div>
            <div className="modal-type">
              <img className="modal-ico" src={recType} alt="" />
              <h1>desszert</h1>
            </div>
            <div className="modal-time">
              <img className="modal-ico" src={time} alt="" />
              <h1>3 óra</h1>
              <h1 style={{ padding: "0", margin: "0" }}>33 perc</h1>
            </div>
          </div>

          <div className="card-title">
            <h1>me still likey me bready</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
