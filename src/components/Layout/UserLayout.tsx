import React, { useEffect, useState } from 'react';
import "./style.scss";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { Payment, History, HomeUser, Account } from 'features/home';
import { Route, Routes } from 'react-router-dom';
import { Setting } from 'features/admin';
import { Toolbar } from '@mui/material';
import { Post, Comment, CommentPost, LiveStream, Video } from 'features/layout';
import { getAllCategory } from 'utils/apis/category';
import { ICategory } from 'models';
import { ToastContainer } from 'react-toastify';

const drawerWidth: number = 240;

export interface UserLayoutProps {
}

export function UserLayout(props: UserLayoutProps) {

  const [menus, setMenus] = useState<ICategory[]>()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebars, setSidebars] = useState([{
    _id: "1",
    name: 'Home',
    image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fhome.svg?alt=media&token=8ba4c82c-e3e6-4bdb-9638-1a8cf04a7956&_gl=1*dct06h*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY5MDguMTUuMC4w',
    url: '',
    menu: '',
    children: [
      {
        id: "11",
        name: 'Trang chủ',
        url: '/home',
        image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fhome.svg?alt=media&token=8ba4c82c-e3e6-4bdb-9638-1a8cf04a7956&_gl=1*dct06h*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY5MDguMTUuMC4w',
        menu: '',
      },
      {
        id: "12",
        name: 'Nạp tiền',
        url: '/user-payment',
        image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fwallet.svg?alt=media&token=763ef16f-02a5-4d38-8491-547d06a0c4ee&_gl=1*vr4ps6*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzcwMDYuNTMuMC4w',
        menu: '',
      },
      {
        id: "13",
        name: 'Lịch sử hoạt động',
        url: '/history',
        image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fhistory.svg?alt=media&token=b3c3b636-e274-4e81-8e48-ea2730ce19df&_gl=1*1d0kpkr*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY4NjguNTUuMC4w',
        menu: '',
      },
    ],
  },])

  const loadMenu = async () => {
    let data = await getAllCategory()
    if (data.code === 200) {
      setMenus(data.data)

      let sidebar = sidebars
      for (let i = 0; i < data.data.length; i++) {
        sidebar = sidebar.concat(data.data[i])
      }
      setSidebars(sidebar)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    loadMenu();
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer />
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar data={sidebars} disable={true} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="" element={<HomeUser />} />
          <Route path="home" element={<HomeUser />} />
          <Route path="payment" element={<Payment />} />
          <Route path="history" element={<History />} />
          <Route path="setting" element={<Setting />} />
          <Route path="account" element={<Account />} />
          {menus?.map((menu) => (
            <React.Fragment key={menu._id}>
              {menu.children !== null && menu.children !== undefined && menu.children.map((child) => (
                <React.Fragment key={child.id}>
                  <Route path={child.url} element={child.menu === '1' ? <Post id={child.id} name={child.name} />
                    : child.menu === '2' ? <Comment id={child.id}  name={child.name}  />
                      : child.menu === '3' ? <CommentPost id={child.id} name={child.name}  />
                        : child.menu === '4' ? <LiveStream id={child.id} name={child.name}  />
                          : <Video id={child.id} name={child.name}  />} />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Routes>
      </Box>
    </Box>
  )
}

