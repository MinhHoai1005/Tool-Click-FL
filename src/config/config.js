export const domainWeb = 'http://localhost:8085/public-api/';

export const Firebase = {
  apiKey: "AIzaSyC2LmCe5Tv9yFnSDN1730FCCb12mHEGZcw",
  authDomain: "toolplus-3ea83.firebaseapp.com",
  databaseURL: "https://toolplus-3ea83-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toolplus-3ea83",
  storageBucket: "toolplus-3ea83.appspot.com",
  messagingSenderId: "882982821045",
  appId: "1:882982821045:web:8af58412fae4b69519f2fc",
  measurementId: "G-19RC86872K"
}
export const api = {
  createAccount: {
    url: domainWeb + 'account/create',
  },
  loginAccount: {
    url: domainWeb + 'account/login',
  },
  loginFacebook: {
    url: domainWeb + 'account/login-facebook',
  },
  loginGmail: {
    url: domainWeb + 'account/login-gmail',
  },
  forgotPasswordSendEmail: {
    url: domainWeb + 'account/forgot-password-sendemail',
  },
  forgotPassword: {
    url: domainWeb + 'account/forgot-password',
  },
  genAccessToken: {
    url: domainWeb + '/cost/public-api/gen-access-token',
  },
  userInfo: {
    url: domainWeb + '/cost/public-api/employee/info',
  },
};
