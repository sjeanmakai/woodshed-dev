import "../stylesheets/layout/_navbar.scss";
import React from "react";

const NavBar = ({ width, height, children }) => {
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          width: width,
          minHeight: height,
        }}
      >
        <div className="content">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
