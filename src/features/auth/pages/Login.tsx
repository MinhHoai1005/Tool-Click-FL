/* eslint-disable eqeqeq */
import React, { ChangeEvent, useEffect, useState } from 'react';
import "./styles.scss"
import { useNavigate } from "react-router-dom";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, TextField, Typography } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import { login } from 'store/Auth/sagas';

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState<boolean>(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));

    if (name === "email") {
      // Kiểm tra định dạng email và cập nhật trạng thái isValidEmail
      if (validator.isEmail(value)) {
        setErrors((err) => ({ ...err, email: "Email không hợp lệ" }));
      }
    }
    if (errors.email != "") {
      if (inputs.email === '') {
        setErrors((err) => ({ ...err, email: "Vui lòng nhập email" }));
      } else {
        setErrors((err) => ({ ...err, email: "" }));
      }
    }
    if (errors.password != "") {
      if (inputs.password === '') {
        setErrors((err) => ({ ...err, password: "Vui lòng nhập mật khẩu" }));
      } else {
        setErrors((err) => ({ ...err, password: "" }));
      }
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

  const handleSubmit = async () => {
    if (inputs.email === '') {
      setErrors((err) => ({ ...err, email: "Vui lòng nhập tên tài khoản" }));
    }
    if (inputs.password === '') {
      setErrors((err) => ({ ...err, password: "Vui lòng nhập mật khẩu" }));
    }
    let res = await login(inputs.email, inputs.password)
    console.log(res)
  };

  const handleClickShowPassword = () => setShow((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className='register'>
      <form className='register-form' style={{ minHeight: '300px' }}>
        <div className='form-close'>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <h3>Đăng nhập tài khoản</h3>
        <TextField
          label={
            <div>
              Địa chỉ email <span style={{ color: 'red' }}>*</span>
            </div>
          }
          variant="standard"
          fullWidth
          name="email"
          onInput={handleInput}
          error={!!errors.email}
          helperText={errors.email}

        />
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Nhập mật khẩu <span style={{ color: 'red' }}>*</span></InputLabel>
          <Input
            name='password'
            type={show ? 'text' : 'password'}
            onInput={handleInput}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password != "" && (<Typography align='left' sx={{ fontSize: '0.75rem', color: '#d32f2f' }} >{errors.password} </Typography>)}
        </FormControl>
        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleSubmit}>
          Đăng nhập
        </Button>
        <Typography sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
          <Link href="/forgot-password"> Quên mật khẩu?</Link>
          <Link href="/register"> Đăng ký</Link>
        </Typography>
      </form>
    </div >

  )
};
export default Login;