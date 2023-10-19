import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Account, Category, Money, Setting } from 'features/admin';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Admin } from './data';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';


const drawerWidth: number = 240;

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
      <Sidebar data={Admin} disable={false} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="category" element={<Category />} />
          <Route path="money" element={<Money />} />
          <Route path="setting" element={<></> } >
            <Route path="happy" element={<Setting />} />
          </Route>
        </Routes>

      </Box>
    </Box>
  )
}
