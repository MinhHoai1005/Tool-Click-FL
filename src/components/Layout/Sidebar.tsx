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
import { Menu } from './data'
import { useNavigate } from 'react-router-dom';
import { MenuSidebar } from 'models';

const drawerWidth = 240;

interface Props {
    data: MenuSidebar[]
    window?: () => Window;
    disable: boolean
}

export default function Sidebar(props: Props) {
    const { window, data, disable } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState<number>(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (id: number, url: string | undefined) => {
        if (url !== undefined) {
            navigate(url);
        } else {
            if (id === open) {
                setOpen(0);
            } else {
                setOpen(id);
            }
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
                    <div key={item.id}>
                        <ListItem disablePadding >
                            <ListItemButton onClick={() => handleClick(item.id, item.url)}>
                                <ListItemIcon>
                                    {item.img === undefined ? item.icon : <img src={item.img} alt={item.name} />}
                                </ListItemIcon>

                                <ListItemText primary={item.name} />
                                {!disable && (
                                    <ListItemIcon>
                                        {item.url !== undefined ? "" : open === item.id ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                )}

                            </ListItemButton>
                        </ListItem>
                        <Collapse in={open === item.id ? true : false} timeout="auto" unmountOnExit >
                            {item.children.map((children) => (
                                <List component="div" disablePadding key={children.id}>
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickLink(children.url)}>
                                        <ListItemIcon>
                                            {children.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={children.name} />
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
