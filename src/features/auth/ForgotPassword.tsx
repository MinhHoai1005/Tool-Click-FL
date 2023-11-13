/* eslint-disable eqeqeq */
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, FormControl, Input, InputAdornment, InputLabel, Link, TextField, Typography, IconButton } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { forgotPasswordSendEmail, forgotPassword } from 'utils/apis/authentication'
import './styles.scss'
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

interface ForgotPasswordProps {
}
export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {

  const navigate = useNavigate();
  const match = useParams<{ id: string }>()
  const id = match.id

  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [show, setShow] = useState<boolean>(false)
  const [showRetypePass, setShowRetypePass] = useState<boolean>(false)
  const [password, setPassWord] = useState<string>('')
  const [retypePass, setRetypePass] = useState<string>('')
  const [errorPass, setErrorPass] = useState<string>('')
  const [errorRetypePass, setErrorRetypePass] = useState<string>('')

  const handleSubmit = async () => {
    if (email === '') {
      setError("Vui lòng nhập tên tài khoản");
    }
    let res = await forgotPasswordSendEmail(email)
    if (res.code !== 200) {
      toast.error(res.message)
    } else {
      toast.success('Vui lòng check email ')
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    if (error != "") {
      if (email === '') {
        setError("Vui lòng nhập tên tài khoản");
      } else {
        setError('');
      }
    }
  }
  const handleInputPass = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'password') {
      setPassWord(value);
      if (errorPass != "") {
        if (password === '') {
          setError("Vui lòng nhập mật khẩu");
        } else {
          setError('');
        }
      }
      return
    }
    if (name === 'retypePass') {
      setRetypePass(value);
      if (errorRetypePass != "") {
        if (retypePass === '') {
          setErrorRetypePass("Vui lòng nhập lại mật khẩu");
        } else {
          setErrorRetypePass('');
        }
      }
      return
    }
  }
  const handleSubmitForgot = async () => {
    if (retypePass === '') {
      setErrorRetypePass("Không được bỏ trống");
      return
    }
    if (password === '') {
      setErrorPass("Không được bỏ trống");
      return
    }
    if (retypePass !== password) {
      setErrorRetypePass("Mật khẩu và mật khẩu nhập lại chưa khớp");
      return
    }
    let res = await forgotPassword(id, password)
    if (res.code !== 200) {
      toast.error(res.message)
    } else {
      toast.success('Đã đổi mật khẩu thành công')
      window.setTimeout(() => { navigate('/login') }, 1000)
    }
  }
  const handleClickShowPassword = () => setShow((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowRetypePass = () => setShowRetypePass((showRetypePass) => !showRetypePass);
  const handleMouseDownRetypePass = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className='register'>
      <ToastContainer />
      <form className='register-form' style={{ minHeight: '300px' }}>
        <div className='form-close'>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <h3>Quên mật khẩu</h3>
        {id == undefined ? (
          <div>
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
              error={!!error}
              helperText={error}

            />
            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleSubmit}>
              Đăng nhập
            </Button>
            <Typography sx={{ mt: 2 }}>Bạn đã có tài khoản?<Link href="/home"> Đăng nhập</Link></Typography>
          </div>
        ) : (<div>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Nhập mật khẩu <span style={{ color: 'red' }}>*</span></InputLabel>
            <Input
              name='password'
              type={show ? 'text' : 'password'}
              onInput={handleInputPass}
              error={!!errorPass}
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
            {errorPass != "" && (<Typography align='left' sx={{ fontSize: '0.75rem', color: '#d32f2f' }} >{errorPass} </Typography>)}
          </FormControl>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span></InputLabel>
            <Input
              name='retypePass'
              type={showRetypePass ? 'text' : 'password'}
              onInput={handleInputPass}
              error={!!errorRetypePass}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRetypePass}
                    onMouseDown={handleMouseDownRetypePass}
                  >
                    {showRetypePass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errorRetypePass != "" && (<Typography align='left' sx={{ fontSize: '0.75rem', color: '#d32f2f' }} >{errorRetypePass} </Typography>)}
          </FormControl>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleSubmitForgot}>
            Xác nhận
          </Button>
        </div>)}

      </form>
    </div >
  )
}
