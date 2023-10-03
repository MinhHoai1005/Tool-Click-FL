import React from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import toolplus from 'images/icon/toolplus.png'
import facebook from 'images/icon/facebook.png'
import google from 'images/icon/google.png'
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { Firebase } from 'config/config'
import { useNavigate } from 'react-router-dom'
import { Link, Typography } from '@mui/material'


const app = initializeApp(Firebase);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerfb = new FacebookAuthProvider();

function HomeLogin() {

    const navigate = useNavigate();

    const signInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, providerfb);
            console.log('Đăng nhập thành công!', result);
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    };
    const handleGoogleLogin = async () => {
        console.log(111)
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Đăng nhập thành công:', user);
            // navigate('/admin');
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    };

    const loginWithToolPlus = () => {
        navigate('/login-toolplus');
    }
    return (
        <div className='home-login'>
            <form className='home-login-form'>
                <div className='form-close'>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <h3>Đăng kí hoặc đăng nhập</h3>
                <div className='login-with'>
                    <div className="login-with-toolclick btn btn-login" onClick={loginWithToolPlus} >
                        <div className='icon'>
                            <img src={toolplus} alt='login-with-toolclick' />
                        </div>
                        <h6>
                            Đăng nhập với ToolPlus
                        </h6>
                    </div>
                    <div className="go btn btn-login login-with-facebook" onClick={signInWithFacebook} >
                        <div className='icon'>
                            <img src={facebook} alt='login-with-facebook' />
                        </div>
                        <h6>
                            Tiếp tục với Facebook
                        </h6></div>
                    <div className="fb btn btn-login login-with-gmail" onClick={handleGoogleLogin} >
                        <div className='icon'>
                            <img src={google} alt='login-with-google' />
                        </div>
                        <h6>
                            Tiếp tục với Gmail
                        </h6></div>
                </div>
                <Typography sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                    <Link href="/forgot-password"> Quên mật khẩu?</Link>
                    <Link href="/register"> Đăng ký</Link>
                </Typography>
            </form>
        </div>
    )
}
export default HomeLogin;