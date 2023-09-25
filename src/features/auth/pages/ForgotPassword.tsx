/* eslint-disable eqeqeq */
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Link, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import './styles.scss'

export const ForgotPassword = () => {

  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = () => {
    if (email === '') {
      setError("Vui lòng nhập tên tài khoản");
    }
    console.log(email)
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

  return (
    <div className='register'>
      <form className='register-form' style={{ minHeight: '300px' }}>
        <div className='form-close'>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <h3>Quên mật khẩu</h3>
        <TextField
          label={
            <div>
              Tên tài khoản <span style={{ color: 'red' }}>*</span>
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
      </form>
    </div >
  )
}
