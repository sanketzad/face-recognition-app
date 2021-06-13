import React from "react";

import "./faceRecognition.css";

const FaceRecognition = ({ image, box }) => {
  console.log(box);
  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="absolute">
        {image ? (
          <React.Fragment>
            <img
              id="inputImage"
              src={image}
              alt="With face recognitized"
              width="500px"
              height="auto"
            />
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default FaceRecognition;
