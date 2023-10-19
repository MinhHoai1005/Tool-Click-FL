import { Box, CssBaseline, Tab, Typography, TextField } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react'
import { formatIntToString } from 'utils';
import './styles.scss'

export const Post = () => {
  //Tab
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //Input
  const [url, setUrl] = React.useState<string>('');
  const [total, setTotal] = React.useState<string>('0');

  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='layout-post'>
      <CssBaseline />
      <Typography variant="h5" component="h5" sx={{ textTransform: 'uppercase' }}>
        BUFF LIKE BÀI Viết
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tạo tiến trình" value="1" />
              <Tab label="Nhật ký Order" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ minWidth: '200px',alignSelf:'center' }}>Link hoặc ID bài viết:</Typography>
              <TextField variant="outlined" fullWidth value={url} onChange={(e) => setUrl(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex',mt:2 }}>
              <Typography sx={{ minWidth: '200px',alignSelf:'center' }}>Chọn cảm xúc:</Typography>
            </Box>
            <Box sx={{ display: 'flex',mt:2 }}>
              <Typography sx={{ minWidth: '200px',alignSelf:'center' }}>Số lượng cần tăng:</Typography>
              <TextField variant="outlined" fullWidth value={total} onChange={(e) => setTotal(formatIntToString(e.target.value).toLocaleString('en-US'))} />
            </Box>
          </TabPanel>
          <TabPanel value="2">Nhật ký Order</TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
