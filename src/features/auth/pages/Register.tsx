/* eslint-disable eqeqeq */
import React, { ChangeEvent, useState } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Link, Typography } from '@mui/material';


export const Register = () => {

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        enter_password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        enter_password: '',
    })
    const [shows, setShows] = useState({
        password: false,
        enter_password: false,
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
        if (errors.username != "") {
            if (inputs.username === '') {
                setErrors((err) => ({ ...err, username: "Vui lòng nhập tên tài khoản" }));
            } else {
                setErrors((err) => ({ ...err, username: "" }));
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
        if (errors.enter_password != "") {
            if (inputs.enter_password === '') {
                setErrors((err) => ({ ...err, enter_password: "Vui lòng nhập lại mật khẩu" }));
            } else {
                setErrors((err) => ({ ...err, enter_password: "" }));
            }
        }
    };


    const handleSubmit = () => {
        if (inputs.username === '') {
            setErrors((err) => ({ ...err, username: "Vui lòng nhập tên tài khoản" }));
        }
        if (inputs.email === '') {
            setErrors((err) => ({ ...err, email: "Vui lòng nhập email" }));
        }
        if (inputs.password === '') {
            setErrors((err) => ({ ...err, password: "Vui lòng nhập mật khẩu" }));
        }
        if (inputs.enter_password === '') {
            setErrors((err) => ({ ...err, enter_password: "Vui lòng nhập lại mật khẩu" }));
        }
        console.log(inputs)
    };

    const handleClickShowEnterPassword = () =>
        setShows((show) => ({ ...show, enter_password: !shows.enter_password }));


    const handleMouseDownEnterPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () =>
        setShows((show) => ({ ...show, password: !shows.password }));


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className='register'>
            <form className='register-form'>
                <div className='form-close'>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <h3>Đăng ký tài khoản</h3>
                <TextField
                    label={
                        <div>
                            Tên tài khoản <span style={{ color: 'red' }}>*</span>
                        </div>
                    }
                    variant="standard"
                    fullWidth
                    name="username"
                    onInput={handleInput}
                    error={!!errors.username}
                    helperText={errors.username}

                />
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
                <TextField
                    label={
                        <div>
                            Số điện thoại
                        </div>
                    }
                    variant="standard"
                    fullWidth
                    name="email"
                    onInput={handleInput}

                />
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Nhập mật khẩu <span style={{ color: 'red' }}>*</span></InputLabel>
                    <Input
                        name='password'
                        type={shows.password ? 'text' : 'password'}
                        onInput={handleInput}
                        error={!!errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {shows.password ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password != "" && (<Typography align='left' sx={{ fontSize: '0.75rem', color: '#d32f2f' }} >{errors.password} </Typography>)}
                </FormControl>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span></InputLabel>
                    <Input
                        name='enter_password'
                        type={shows.enter_password ? 'text' : 'password'}
                        onInput={handleInput}
                        error={!!errors.enter_password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowEnterPassword}
                                    onMouseDown={handleMouseDownEnterPassword}
                                >
                                    {shows.enter_password ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.enter_password != "" && (<Typography align='left' sx={{ fontSize: '0.75rem', color: '#d32f2f' }} >{errors.enter_password} </Typography>)}

                </FormControl>
                <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleSubmit}>
                    Đăng ký
                </Button>
                <Typography sx={{ mt: 2 }}>Bạn đã có tài khoản?<Link href="/home"> Đăng nhập</Link></Typography>
            </form>
        </div >
    )
}
