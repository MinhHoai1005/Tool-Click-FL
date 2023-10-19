import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import StorageIcon from '@mui/icons-material/Storage';
import FacebookIcon from '@mui/icons-material/Facebook';
import DnsIcon from '@mui/icons-material/Dns';
import Tiktok from 'images/icon/tiktok.svg';
import CategoryIcon from '@mui/icons-material/Category';
import ListIcon from '@mui/icons-material/List';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';

export const Menu = [
  {
    id: 1,
    name: 'Home',
    icon: <HomeIcon />,
    children: [
      {
        id: 11,
        name: 'Trang chủ',
        icon: <HomeIcon />,
        url: '/home',
      },
      {
        id: 12,
        name: 'Nạp tiền',
        icon: <PaidIcon />,
        url: '/recharge',
      },
      {
        id: 13,
        name: 'Lịch sử hoạt động',
        icon: <HistoryIcon />,
        url: '/history',
      },
    ],
  },
  {
    id: 2,
    name: 'Facebook',
    icon: <FacebookIcon />,
    children: [
      {
        id: 21,
        name: 'Server Người Thật',
        icon: <StorageIcon />,
        url: '/server-human',
      },
      {
        id: 22,
        name: 'Server Auto',
        icon: <DnsIcon />,
        url: '/server-auto',
      },
      {
        id: 23,
        name: 'Facebook Vip',
        icon: <FacebookIcon />,
        url: '/facebook-vip',
      },
    ],
  },
  {
    id: 3,
    name: 'Tiktok',
    img: Tiktok,
    url: '/tiktok',
    children: [],
  },
];
export const Admin = [
  {
    id: 1,
    name: 'Danh mục',
    icon: <CategoryIcon />,
    url: '/admin/category',
    children: [],
  },
  {
    id: 2,
    name: 'Người dùng',
    icon: <ListIcon />,
    url: '/admin/account',
    children: [],
  },
  {
    id: 3,
    name: 'Nạp tiền',
    icon: <MonetizationOnIcon />,
    url: '/admin/money',
    children: [],
  },
  {
    id: 4,
    name: 'Cài đặt',
    icon: <SettingsIcon />,
    children: [
      {
        id: 41,
        name: 'Danh sách cảm xúc',
        icon: <StorageIcon />,
        url: 'setting/happy',
      },
      // {
      //   id: 42,
      //   name: 'Giao diện',
      //   icon: <DnsIcon />,
      //   url: 'setting/happy',
      // },
    ],
  },
];
