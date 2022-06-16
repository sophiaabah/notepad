import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await resp.json();

    if (data.email) {
      props.setUserInfo(data);
      navigate("/notes");
    }
  };

  return (
    <main className="box pa4 black-80">
      <form className="measure center" onSubmit={onRegister}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create an account</legend>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="name">
              What's your name?
            </label>
            <input
              onChange={onNameChange}
              className="b pa2 input-reset ba bg-transparent w-100"
              value={name}
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
              value={email}
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
              value={password}
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}
