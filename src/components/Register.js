import React, { useState } from 'react';


function Register({ onRouteChange, loadUserInfo }){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onNameSubmit(e) {
    setName(e.target.value)
  }

  function onEmailSubmit(e) {
    setEmail(e.target.value)
  }

  function onPasswordSubmit(e) {
    setPassword(e.target.value)
  }

  function onRegister() {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.id){
        loadUserInfo(data);
        onRouteChange('home');
      }
    }) 
  }

  return(
    <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="name">What's your name?</label>
            <input onChange={onNameSubmit} className="b pa2 input-reset ba bg-transparent w-100" type="text" name="name"  id="name" />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input onChange={onEmailSubmit} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input onChange={onPasswordSubmit} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password" />
          </div>
        </fieldset>
        <div className="">
          <input onClick={onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
        </div>
      </form>
    </main>
  )



}

export default Register;