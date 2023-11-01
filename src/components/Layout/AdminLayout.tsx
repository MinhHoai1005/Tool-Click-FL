import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Account, Category, Money, Setting } from 'features/admin';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';

const drawerWidth: number = 240;

const menu = [{
  _id: '1',
  name: 'Danh mục',
  url: '/admin/category',
  image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fcategory.svg?alt=media&token=e0bc18ee-f844-4cc5-b25c-fd3d4ea4e576&_gl=1*1htfac3*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY4MTcuMzUuMC4w',
  children: [],
  menu:'',
},
{
  _id: '2',
  name: 'Người dùng',
  url: '/admin/account',
  image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Flist-solid.svg?alt=media&token=613a7ba6-23e1-4097-b45f-06cf559f475e&_gl=1*axct49*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY5NDQuNTMuMC4w',
  children: [],
  menu:'',
},
{
  _id: '3',
  name: 'Nạp tiền',
  url: '/admin/money',
  image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fwallet.svg?alt=media&token=763ef16f-02a5-4d38-8491-547d06a0c4ee&_gl=1*vr4ps6*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzcwMDYuNTMuMC4w',
  children: [],
  menu:'',
},
{
  _id: '4',
  name: 'Cài đặt',
  url: '/admin/setting',
  image: 'https://firebasestorage.googleapis.com/v0/b/toolplus-3ea83.appspot.com/o/2023%2Fgear-solid.svg?alt=media&token=a42f53fd-642a-44d6-ac82-b3b6a125b59f&_gl=1*iqjmj9*_ga*NTg1ODg5MjYyLjE2Njk5ODM1NTg.*_ga_CW55HF8NVT*MTY5ODQ3Njc5Mi4zNS4xLjE2OTg0NzY4NDMuOS4wLjA.',
  children: [],
  menu:'',
},
]
export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer />
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar data={menu} disable={false} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="category" element={<Category />} />
          <Route path="money" element={<Money />} />
          <Route path="setting" element={<Setting />} >
          </Route>
        </Routes>

      </Box>
    </Box>
  )
}
