import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
    <main className="pa4 black-80">
      <form className="measure center" onSubmit={onSignIn}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              onChange={onEmailChange}
              value={email}
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
              value={password}
              onChange={onPasswordChange}
              className="b pa2 input-reset ba bg-transparent w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
            Sign in
          </button>
        </div>
        <div className="lh-copy mt3">
          <p>Don't have an account?</p>
          <Link to="/register" className="f6 link dim black underline db">
            Sign up
          </Link>
        </div>
      </form>
    </main>
  );
}
