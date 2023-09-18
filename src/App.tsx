import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage  from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound } from 'components/Common';
import PrivateRoutes from 'components/Common/PrivateRoutes';

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
        <Route path='/login' element={<LoginPage></LoginPage>}>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
