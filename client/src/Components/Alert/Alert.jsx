import React from "react";
import "./AlertStyles.css";
import { useAppContext } from "../../Context/appContext";

const Alert = () => {
  const {  alertText } = useAppContext();
  return (
    <div className="alert">
      <h1>{alertText}</h1>
    </div>
  );
};

export default Alert;
