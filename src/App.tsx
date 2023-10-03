import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminLayout, UserLayout } from 'components/Layout';
import { NotFound } from 'components/Common';
import PrivateRoutes from 'components/Common/PrivateRoutes';
import { Register } from 'features/auth/pages/Register';
import { ForgotPassword } from 'features/auth/pages/ForgotPassword';
import HomeLogin from 'features/auth/pages/HomeLogin';
import Login from 'features/auth/pages/Login';
import { Account, Category, Money, Setting } from 'features/admin';
function App() {
  useEffect(() => {
    // accountApi.create().then((response) => console.log(response))
  })
  return (
    <div >
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<UserLayout />} path="/" />
          <Route element={<UserLayout />} path="/home" />
          <Route element={<UserLayout />} path="/recharge" />
          <Route element={<UserLayout />} path="/history" />
        </Route>
        <Route path='/admin' element={<AdminLayout></AdminLayout>} >
          <Route path="account" element={<Account />} />
          <Route path="category" element={<Category />} />
          <Route path="money" element={<Money />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path='/login-toolplus' element={<Login></Login>} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/login' element={<HomeLogin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
