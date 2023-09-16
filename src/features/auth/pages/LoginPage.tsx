import { useAppDispatch } from 'app/hooks';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {  AuthState } from '../authSlice';
import "./styles.css"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const LoginPage = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useAppDispatch();
  const loading = useSelector<AuthState>((state: any) => state.auth.logging);

  const history = useNavigate()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(inputs)
    // dispatch(authAction.login({ username: '', password: '' }))
  };
  useEffect(() => {
    const isLoginIn = Boolean(localStorage.getItem('access_token'))
    if (isLoginIn) {
      history('/admin');
    }
    console.log(loading)
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
          <>{loading && (
            <span className='spinner-border spinner-border-sm mr-1'></span>
          )}</>

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