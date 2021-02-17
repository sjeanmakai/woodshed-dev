import React from "react";
import "../stylesheets/pages/_login.scss";

const Alert = (props) => {
  return (
    <div className={`alert ${props.type}`}>
      <div>{props.message}</div>
    </div>
  );
};

export default Alert;
