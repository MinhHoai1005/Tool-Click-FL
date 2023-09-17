// import { useAppDispatch } from 'app/hooks';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import "./styles.css"
import { useNavigate } from 'react-router-dom'
import {  login } from 'store/Auth/sagas';

export const LoginPage = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const history = useNavigate()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    let response = await login("111","2222")
    if (response.token !==""){
      console.log(1111)
      history('/admin');
      console.log(444)
    }
  };
  useEffect(() => {
    const isLoginIn = Boolean(localStorage.getItem('access_token'))
    if (isLoginIn) {
      history('/admin');
    }
  })

  return (
    <div className="layout-login">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" name="username" onInput={handleInput}
        // className={
        //   (submitted && !inputs.username ? 'is-invalid' : '')
        // }
        />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" name="password" onInput={handleInput}
        // className={
        //   (submitted && !inputs.password ? 'is-invalid' : '')
        // }
        />
        <button >
          {/* <>{loading && (
            <span className='spinner-border spinner-border-sm mr-1'></span>
          )}</> */}

          Login In
        </button>
        <div className="social">
          <div className="go"><i className="fab fa-google" /> Google</div>
          <div className="fb"><i className="fab fa-facebook" /> Facebook</div>
        </div>
      </form>
    </div >
  )
};
function useHistory() {
  throw new Error('Function not implemented.');
}