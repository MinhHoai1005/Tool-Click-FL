import React, { useEffect, useState } from 'react';
import "./style.scss";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { Recharge, History, HomeUser } from 'features/home';
import { Menu } from './data'
import { Route, Routes } from 'react-router-dom';
import { Setting } from 'features/admin';
import { Toolbar } from '@mui/material';
import { Post } from 'features/layout';

const drawerWidth: number = 240;

export interface UserLayoutProps {
}
export function UserLayout(props: UserLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabView, setTabView] = useState<string>("home")
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    setTabView(window.location.pathname)
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Sidebar data={Menu} disable={false} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="home" element={<HomeUser />} />
          <Route path="recharge" element={<Recharge />} />
          <Route path="history" element={<History />} />
          <Route path="setting" element={<Setting />} >
          </Route>
          <Route path="layout" element={<Post />} />
        </Routes>
      </Box>
    </Box>
  )
}

