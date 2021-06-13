import React, { useState } from "react";

const SignIn = ({ onSignInClicked, registerClick, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onHandleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onHandleChangePassword(event) {
    setPassword(event.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({ email: email, password: password });
    fetch("http://localhost:8080/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onSignInClicked();
        }
      });
  }

  return (
    <article className="br3 ba dark-black b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={onHandleChangeEmail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onHandleChangePassword}
              />
            </div>
          </fieldset>
          <div className="">
            {!email.length > 0 && !password.length > 0 ? null : (
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmit}
              />
            )}
          </div>
          <div className="lh-copy mt3">
            <p onClick={registerClick} className="f6 link dim black db pointer">
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
