import React from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

interface HeaderProps {
    drawerWidth: number,
    handleDrawerToggle: Function
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { drawerWidth, handleDrawerToggle } = props

    const onClickDrawerToggle = () => {
        handleDrawerToggle()
    }
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onClickDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Responsive drawer
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
