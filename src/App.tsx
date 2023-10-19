import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'components/Common/customReduxRouter';
import { store } from 'store';
import { history } from 'utils';
import { NotFound } from "components/Common"
import PrivateRoutes from "components/Common/PrivateRoutes"
import { AdminLayout, UserLayout } from "components/Layout"
import { Account, Category, Money, Setting } from "features/admin"
import { ForgotPassword } from "features/auth/ForgotPassword"
import HomeLogin from "features/auth/HomeLogin"
import Login from "features/auth/Login"
import { Register } from "features/auth/Register"
import { Route, Routes } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Post } from 'features/layout';
import { Recharge, History, HomeUser } from 'features/home';
function App() {
  useEffect(() => {
    // accountApi.create().then((response) => console.log(response))
  })
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <CssBaseline />
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* User */}
            <Route path="/" element={<UserLayout />} >
              <Route path="home" element={<HomeUser />} />
              <Route path="recharge" element={<Recharge />} />
              <Route path="history" element={<History />} />
              <Route path="layout" element={<Post />} />
            </Route>
            {/* Admin */}
            <Route path='/admin' element={<AdminLayout></AdminLayout>} >
              <Route path="account" element={<Account />} />
              <Route path="category" element={<Category />} />
              <Route path="money" element={<Money />} />
              <Route path="setting" element={<Setting />} >
                <Route path="happy" element={<HomeUser />} />
              </Route>
            </Route>
          </Route>
          <Route path='/login-toolplus' element={<Login></Login>} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password/:id' element={<ForgotPassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/login' element={<HomeLogin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

