import React from "react";

const Navigation = ({ signIn, onSingOutClicked, register }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 link dim underline black pa3 pointer"
        onClick={onSingOutClicked}
      >
        {signIn ? null : register ? null : "Sign Out"}
      </p>
    </div>
  );
};

export default Navigation;
