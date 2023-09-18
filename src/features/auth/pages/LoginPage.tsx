// import { useAppDispatch } from 'app/hooks';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import "./styles.css"
import { useNavigate } from "react-router-dom";
import { login } from 'store/Auth/sagas';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { Firebase } from 'config/config';

const app = initializeApp(Firebase);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerfb = new FacebookAuthProvider();

function LoginPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await login("111", "2222")
    if (response.token !== "") {
      // checkLogin()
    }
  };
  const signInWithFacebook = async () => {
    console.log("FB")
    try {
      await signInWithPopup(auth, provider);
      console.log('Đăng nhập thành công!');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, providerfb);
      const user = result.user;
      console.log('Đăng nhập thành công:', user);
      navigate('/admin');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Sử dụng setTimeout để chuyển hướng sau khi component đã render xong.
      setTimeout(() => {
        navigate('/admin');
      }, 0);
    }
  }, [navigate]);


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
          <div className="go" onClick={handleGoogleLogin} ><i className="fab fa-google" /> Google</div>
          <div className="fb"  onClick={signInWithFacebook} ><i className="fab fa-facebook"/> Facebook</div>
        </div>
      </form>
    </div >
  )
};
export default LoginPage;