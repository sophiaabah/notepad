import React, { useState } from "react";

function Register({ onRouteChange, loadUserInfo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onRegister() {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUserInfo(data);
          onRouteChange("home");
        }
      });
  }

  return (
    <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create an account with us</legend>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="name">
              What's your name?
            </label>
            <input
              onChange={onNameChange}
              className="b pa2 input-reset ba bg-transparent w-100"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              onChange={onEmailChange}
              className="pa2 input-reset ba bg-transparent w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              onChange={onPasswordChange}
              className="b pa2 input-reset ba bg-transparent w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <input
            onClick={onRegister}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </main>
  );
}

export default Register;
