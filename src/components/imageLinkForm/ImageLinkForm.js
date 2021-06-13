import React from "react";

import "./style.css";

const ImageLinkForm = ({ onInputChange, onSubmit, value }) => {
  return (
    <div>
      <p className="f3" style={{ color: "white" }}>
        {"This magin brain detects faces in image uploaded. Give it a try!"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
            value={value}
            placeholder="Enter image URL..."
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
