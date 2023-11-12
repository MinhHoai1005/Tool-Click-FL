import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    drawerWidth: number,
    handleDrawerToggle: Function
}
const user = localStorage.getItem('user')

export const Header: React.FC<HeaderProps> = (props) => {
    const { drawerWidth, handleDrawerToggle } = props
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState({
        email: '',
        client_id: 0,
        total: 0,
        user_name: '',
    })


    const onClickDrawerToggle = () => {
        handleDrawerToggle()
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('login')
    }
    const handleAccount = () => {
        navigate('account')
    }
    const handlePayment = () => {
        navigate('payment')
    }
    useEffect(() => {
        if (user) {
            const userObject = JSON.parse(user);
            setAccounts((account) => ({ ...account, 'client_id': userObject.client_id,'email': userObject.email,'total': userObject.total,"user_name": userObject.user_name}));
        }
    }, [])
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: 'white',
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
                <Typography variant="h6" noWrap component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ display: 'grid', justifyItems: 'center' }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src=""
                            sx={{ width: '30px', height: '30px' }}
                        />
                        <Typography variant="caption">Khách hàng: {accounts.user_name} - ID :{accounts.client_id}</Typography>
                        <Typography variant="caption">Số tiền: {accounts.total.toLocaleString('en-US')}</Typography>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleAccount}>Tài khoản</MenuItem>
                        <MenuItem onClick={handlePayment}>Nạp tiền</MenuItem>
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
