// export const domainWeb = 'http://localhost:8085/public-api/';
export const domainWeb = 'https://api.toolplus.click/public-api/';

export const Firebase = {
  apiKey: 'AIzaSyC2LmCe5Tv9yFnSDN1730FCCb12mHEGZcw',
  authDomain: 'toolplus-3ea83.firebaseapp.com',
  databaseURL: 'https://toolplus-3ea83-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'toolplus-3ea83',
  storageBucket: 'toolplus-3ea83.appspot.com',
  messagingSenderId: '882982821045',
  appId: '1:882982821045:web:8af58412fae4b69519f2fc',
  measurementId: 'G-19RC86872K',
};
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
  getAllAccount: {
    url: domainWeb + 'account/getall',
  },
  getAllAccountMoney: {
    url: domainWeb + 'account/getall-money',
  },
  switchStausAccount: {
    url: domainWeb + 'account/update-status',
  },
  getDashboard:{
    url: domainWeb + 'account/dashboard',
  },
  // Money
  moneyAddByAdmin: {
    url: domainWeb + 'user-payment/add-byadmin',
  },
  getAllMoney: {
    url: domainWeb + 'user-payment/getall',
  },
  switchStausMoney: {
    url: domainWeb + 'user-payment/switch',
  },
  userInfo: {
    url: domainWeb + '/cost/public-api/employee/info',
  },

  //Category
  createCategory: {
    url: domainWeb + 'category/create',
  },
  updateCategory: {
    url: domainWeb + 'category/update',
  },
  getAllCategory: {
    url: domainWeb + 'category/getall',
  },
  deleteCategory: {
    url: domainWeb + 'category/delete',
  },
  getDetailCategory: {
    url: domainWeb + 'category/detail',
  },
  deleteChildrenCategory: {
    url: domainWeb + 'category/children/delete',
  },
  updateChildrenCategory: {
    url: domainWeb + 'category/children/update',
  },
  getCategoryId: {
    url: domainWeb + 'category/getId',
  },
  //Setting
  createSetting: {
    url: domainWeb + 'setting/create',
  },
  updateSetting: {
    url: domainWeb + 'setting/update',
  },
  deleteSetting: {
    url: domainWeb + 'setting/delete',
  },
  getAllSetting: {
    url: domainWeb + 'setting/getall',
  },

  //Price
  createPrice: {
    url: domainWeb + 'price/create',
  },
  getAllPrice: {
    url: domainWeb + 'price/getall',
  },
  getPrice: {
    url: domainWeb + 'price/detail',
  },
  getPriceLike: {
    url: domainWeb + 'price/like',
  },
  getPriceByHappy: {
    url: domainWeb + 'price/detail-happy',
  },
  //Process
  createProcess: {
    url: domainWeb + 'process/create',
  },
  loadProcessId: {
    url: domainWeb + 'process/detailId',
  },
  loadProcessByLink: {
    url: domainWeb + 'process/detailLink',
  },
  processClientID: {
    url: domainWeb + 'process/client_id',
  },
  //File
  uploadFile: {
    url: domainWeb + 'middlewares/uploadfile',
  },
};
