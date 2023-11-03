import { Box, CssBaseline, Tab, Typography, TextField, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react'
import { formatIntToString } from 'utils';
import './styles.scss'
import { getPrice } from 'utils/apis/setting';
import { ISetting, IConfig } from 'models';
import { Note } from './data'
import { History } from './History'
import { createProcess } from 'utils/apis/process';
import { toast } from 'react-toastify';

interface LiveStreamProps {
  id: string,
  name: string,
}
export const LiveStream: React.FC<LiveStreamProps> = (props) => {
  const { id, name } = props;
  //Tab
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //Input
  const [url, setUrl] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(50);
  const [time, setTime] = useState<number>(30);

  const loadPrice = async (id: string) => {
    let data = await getPrice(id)
    if (data.code === 200) {
      if (data.data.length > 0) {
        setPrice(data.data[0].price)
      }
    }
  }
  useEffect(() => {
    loadPrice(id);
  }, [id])
  const onSubmit = async () => {
    if (time > 0) {
      toast.error("Thời gian xem phải lớn hơn 0 " + price)
      return
    }
    let data = await createProcess(id, price, quantity, url, note,"", time)
    if (data.code === 200) {
      toast.success('Tạo mới tiến trình thành công')
      setQuantity(0)
      setUrl('')
      setNote('')
      setTime(5)
    } else {
      toast.error(data.message)
    }
  }
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='layout-post'>
      <CssBaseline />
      <Typography variant="h5" component="h5" sx={{ textTransform: 'uppercase' }}>
        {name}
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
            <Box sx={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '10px' }}>
              <Box >
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Nhập Link cần tăng View:</Typography>
                  <TextField variant="outlined" fullWidth multiline value={url} onChange={(e) => setUrl(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Số lượng mắt cần tăng:</Typography>
                  <TextField variant="outlined"label="Mặc định là 50" fullWidth value={quantity.toLocaleString('en-US')} onChange={(e) => setQuantity(formatIntToString(e.target.value))} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Thời gian xem video:</Typography>
                  <TextField variant="outlined" label="Mỗi số tương ứng với số giây cần buff, mặc định là 30 giây" fullWidth value={time} onChange={(e) => setTime(formatIntToString(e.target.value))} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Ghi chú:</Typography>
                  <TextField variant="outlined" label="Nhập nội dung ghi chú về tiến trình của bạn" fullWidth multiline value={note} onChange={(e) => setNote(e.target.value)} />
                </Box>
                <Box>
                  <div style={{textAlign:'center',color:'#e46a76',background:'#FEE9B2',marginTop:"5px",borderRadius: '5px', width: '100%', padding: '16.5px 14px'}}>
                    
                    <div style={{fontWeight:'bold'}}>
                    {"Tổng tiền = (Số lượng mắt) x (Số phút) x (Giá tiền order mỗi mắt)"}
                    </div>
                  </div>
                </Box>
                <Box sx={{ textAlign: 'center', background: '#FFAA47', p: 2, mt: 2, borderRadius: '5px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', color: 'white !important' }}>
                    <Typography >Tổng </Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}>{quantity * price * time} xu </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', color: 'white !important' }}>
                    <Typography >Bạn sẽ buff </Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}> {quantity.toLocaleString('en-US')} view </Typography>
                    <Typography >với giá</Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}>{price.toLocaleString('en-US')} Xu / Mắt </Typography>
                  </Box>
                </Box>
                <Button sx={{ mt: 1, width: '100%', padding: '0.75rem 1.5rem', background: '#007DC4', color: 'white' }} onClick={onSubmit}>
                  Tạo tiến trình
                </Button>
              </Box>
              <Box>
                <div
                  dangerouslySetInnerHTML={{
                    __html: Note.attention,
                  }}
                  style={{ border: '1px solid', borderRadius: '5px', padding: '16.5px 14px', borderColor: 'rgba(0, 0, 0, 0.23)', background: '#FFA192' }}
                ></div>
              </Box>
            </Box>

          </TabPanel>
          <TabPanel value="2">
            <History id={id} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}