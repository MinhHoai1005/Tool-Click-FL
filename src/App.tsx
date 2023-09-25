import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from 'components/Layout';
import { NotFound } from 'components/Common';
import PrivateRoutes from 'components/Common/PrivateRoutes';
import { Register } from 'features/auth/pages/Register';
import { ForgotPassword } from 'features/auth/pages/ForgotPassword';
import Home from 'features/auth/pages/Home';
import Login from 'features/auth/pages/Login';

function App() {
  useEffect(() => {
    // accountApi.create().then((response) => console.log(response))
  })
  return (
    <div >
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AdminLayout />} path="" />
          <Route element={<AdminLayout />} path="/" />
          <Route element={<AdminLayout />} path="/admin" />
        </Route>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />

        <Route path='/home' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
