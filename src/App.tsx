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
import { ForgotPassword } from "features/auth/pages/ForgotPassword"
import HomeLogin from "features/auth/pages/HomeLogin"
import Login from "features/auth/pages/Login"
import { Register } from "features/auth/pages/Register"
import { Route, Routes } from "react-router-dom"

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
            <Route element={<UserLayout />} path="/" />
            <Route element={<UserLayout />} path="/home" />
            <Route element={<UserLayout />} path="/recharge" />
            <Route element={<UserLayout />} path="/history" />
            {/* Admin */}
            <Route path='/admin' element={<AdminLayout></AdminLayout>} >
              <Route path="account" element={<Account />} />
              <Route path="category" element={<Category />} />
              <Route path="money" element={<Money />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Route>
          <Route path='/login-toolplus' element={<Login></Login>} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path='/login' element={<HomeLogin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

