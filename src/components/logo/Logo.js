import React from "react";
import Tilt from "react-tilt";

import "./Logo.css";
import LOGO from "./LOGO.png";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br1 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img src={LOGO} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
