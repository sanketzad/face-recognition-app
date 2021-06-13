import React, { useState } from "react";

const Register = ({
  registerClick,
  onSignInClicked,
  onSingOutClicked,
  loadUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onRegisterButtonClicked() {
    const body = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    fetch("http://localhost:8080/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onSignInClicked();
        }
      });
  }

  return (
    <article className="br3 ba dark-black b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                type="text"
                name="name-address"
                id="name-address"
                value={name}
                onChange={onNameChange}
              />
            </div>
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
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Submit"
              disabled={
                !email.length > 0 && !email.length > 0 && !password.length > 0
              }
              onClick={onRegisterButtonClicked}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={onSingOutClicked}
              className="f6 link dim black db pointer"
            >
              Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
