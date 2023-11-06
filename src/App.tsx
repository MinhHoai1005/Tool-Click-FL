import { CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { Post, Comment, CommentPost, LiveStream, Video } from 'features/layout';
import { Recharge, History, HomeUser,Account as AccountUser } from 'features/home';
import { getAllCategory } from 'utils/apis/category';
import { ICategory } from 'models';

function App() {

  const [menus, setMenus] = useState<ICategory[]>()
  const loadMenu = async () => {
    let data = await getAllCategory()
    if (data.code === 200) {
      setMenus(data.data)
    }
  }
  useEffect(() => {
    loadMenu();
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <CssBaseline />
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* User */}
            <Route path="/" element={<UserLayout />} >
              <Route path="home" element={<HomeUser />} />
              <Route path="user-payment" element={<Recharge />} />
              <Route path="history" element={<History />} />
              <Route path="account" element={<AccountUser />} />
              {menus?.map((menu) => (
                <React.Fragment key={menu._id}>
                  {menu.children !== null && menu.children !== undefined && menu.children.map((child) => (
                    <React.Fragment key={child.id}>
                      <Route path={child.url} element={child.menu === '1' ? <Post id={child.id}name={'Buff like bài viết'} /> 
                      : child.menu === '2' ? <Comment id={child.id} name={'Buff like comment'}/> 
                      : child.menu === '3' ? <CommentPost id={child.id} name={'Buff comment bài viết'}/> 
                      : child.menu === '4' ? <LiveStream id={child.id}name={'Buff mắt livestream'} /> 
                      : <Video id={child.id} name='Buff view video'/>} />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </Route>
            <Route path='/admin' element={<AdminLayout></AdminLayout>} >
              <Route path="account" element={<Account />} />
              <Route path="category" element={<Category />} />
              <Route path="money" element={<Money />} />
              <Route path="setting" element={<Setting />} >
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

