import React from "react";
import "./AlertStyles.css";
import { useAppContext } from "../../Context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <div>
      ALERT TYPE:{alertType} ALERT TEXT:{alertText}
    </div>
  );
};

export default Alert;
