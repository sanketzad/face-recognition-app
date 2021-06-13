import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";

import "./App.css";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Rank from "./components/rank/Rank";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [signIn, setSignIn] = useState(true);
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   fetch("http://localhost:8080/")
  //     .then((response) => response.json())
  //     .then(console.log);
  // }, []);

  function onInputChange(event) {
    setInputValue(event.target.value);
  }

  function onSubmit(event) {
    setImageUrl(inputValue);
    fetch("http://localhost:8080/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: inputValue }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:8080/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userData.id }),
          })
            .then((response) => response.json())
            .then((user) => setUserData(user));
        }
        setBox(calculateFaceLocation(response));
      })
      // .then((boxData) => setBox(boxData))
      .catch((err) => console.log(err));

    setInputValue("");
  }

  //Image URL: https://pbs.twimg.com/profile_banners/1277536460/1497615358/1500x500, https://mojagear.com/wp-content/uploads/2016/11/Climber-Spotlight-Ben-Hanna.jpg
  //Data:           response.outputs[0].data.regions[0].region_info.bounding_box

  function calculateFaceLocation(data) {
    const clarifaiData =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiData.left_col * width,
      topRow: clarifaiData.top_row * height,
      rightCol: width - clarifaiData.right_col * width,
      bottomRow: height - clarifaiData.bottom_row * height,
    };
  }

  function onSignInClicked() {
    setSignIn(false);
    setRegister(false);
  }

  function onSingOutClicked() {
    setSignIn(true);
    setRegister(false);
  }

  function registerClick() {
    setSignIn(false);
    setRegister(true);
  }

  function loadUser(data) {
    setUserData(data);
  }

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation
        signIn={signIn}
        register={register}
        onSingOutClicked={onSingOutClicked}
      />
      {signIn ? (
        <SignIn
          onSignInClicked={onSignInClicked}
          registerClick={registerClick}
          loadUser={loadUser}
        />
      ) : register ? (
        <Register
          registerClick={registerClick}
          onSignInClicked={onSignInClicked}
          onSingOutClicked={onSingOutClicked}
          loadUser={loadUser}
        />
      ) : (
        <React.Fragment>
          <Rank user={userData} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            value={inputValue}
          />
          <FaceRecognition image={imageUrl} box={box} />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
