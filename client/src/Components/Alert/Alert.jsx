import React from "react";
import "./AlertStyles.css";
import { useAppContext } from "../../Context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <div className="alert">
      {/* ALERT TYPE:{alertType} ALERT TEXT:{alertText} */}
      <h1>{alertText}</h1>
    </div>
  );
};

export default Alert;
