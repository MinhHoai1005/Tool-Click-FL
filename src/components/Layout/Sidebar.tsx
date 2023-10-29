import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import './style.scss'
import toolplus from 'images/icon/toolplus.png'
import { useNavigate } from 'react-router-dom';
import { ICategory } from 'models';

const drawerWidth = 240;

interface Props {
    data: ICategory[]
    window?: () => Window;
    disable: boolean
}

export default function Sidebar(props: Props) {
    const { window, data, disable } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState<string>('');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (id: string, url: string, length: number) => {
        if (length>0){
            if (id === open) {
                setOpen('');
            } else {
                setOpen(id);
            }
        }else{
            navigate(url);
        }
    };
    const handleClickLink = (value: string) => {
        navigate(value);
    };
    const drawer = (
        <div>
            <Link href="/home" sx={{ textDecoration: "none", color: "white", display: 'flex', justifyContent: 'center', height: '50px', m: 2 }}>
                <img src={toolplus} alt='logo tool plus' />
            </Link>
            <Divider />
            <List>
                {data.map((item) => (
                    <div key={item._id}>
                        <ListItem disablePadding >
                            <ListItemButton onClick={() => handleClick(item._id, item.url, item.children.length)}>
                                <ListItemIcon>
                                    <img src={item.image} alt={item.name} style={{ width: '30px', height: '30px' }} />
                                </ListItemIcon>

                                <ListItemText primary={item.name} />
                                {disable && item.children.length > 0 && (
                                    <ListItemIcon>
                                        {open === item._id ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                )}

                            </ListItemButton>
                        </ListItem>
                        <Collapse in={open === item._id ? true : false} timeout="auto" unmountOnExit >
                            {item.children.map((child) => (
                                <List component="div" disablePadding key={child.id}>
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickLink(child.url)}>
                                        <ListItemIcon>
                                            <img src={child.image} alt={child.name} style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={child.name} />
                                    </ListItemButton>
                                </List>
                            ))}
                        </Collapse>
                    </div>
                ))}

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
