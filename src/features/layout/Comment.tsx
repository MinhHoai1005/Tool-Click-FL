
import { Box, CssBaseline, Tab, Typography, TextField, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react'
import { formatIntToString } from 'utils';
import './styles.scss'
import { getPriceLike } from 'utils/apis/setting';
import { Note } from './data'
import { History } from './History'
import { createProcess } from 'utils/apis/process';
import { toast } from 'react-toastify';

interface CommentProps {
  id: string,
  name: string,
}
export const Comment: React.FC<CommentProps> = (props) => {
  const { id, name } = props;
  //Tab
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //Input
  const [url, setUrl] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const loadPrice = async (id: string) => {
    let data = await getPriceLike(id)
    if (data.code === 200) {
      if (data.data.price !== undefined) {
        setPrice(data.data.price)
        setTotal(data.data.price)
      }
    }
  }
  useEffect(() => {
    loadPrice(id);
  }, [id])
  const onSubmit = async () => {
    if (total < price) {
      toast.error("Giá tiền mỗi tương tác không được thấp hơn " + price)
      return
    }
    let data = await createProcess(id, total, quantity, url, note)
    if (data.code === 200) {
      toast.success('Tạo mới tiến trình thành công')
      setTotal(price)
      setQuantity(0)
      setUrl('')
      setNote('')
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
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Link hoặc ID bài viết:</Typography>
                  <TextField variant="outlined" fullWidth multiline value={url} onChange={(e) => setUrl(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Số lượng cần tăng:</Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: Note.note,
                    }}
                    style={{ border: '1px solid', borderRadius: '5px', padding: '16.5px 14px', borderColor: 'rgba(0, 0, 0, 0.23)', color: '#e46a76' }}
                  ></div>
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Số lượng cần tăng:</Typography>
                  <TextField variant="outlined" fullWidth value={quantity.toLocaleString('en-US')} onChange={(e) => setQuantity(formatIntToString(e.target.value))} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Box>
                    <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Giá tiền mỗi tương tác:</Typography>
                    <Typography sx={{ minWidth: '200px', alignSelf: 'center', color: '#e46a76' }}>Giá thấp nhất: {price.toLocaleString('en-US')} xu</Typography>
                  </Box>
                  <TextField variant="outlined" fullWidth value={total.toLocaleString('en-US')} onChange={(e) => setTotal(formatIntToString(e.target.value))} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Ghi chú:</Typography>
                  <TextField variant="outlined" label="Nhập nội dung ghi chú về tiến trình của bạn" fullWidth multiline value={note} onChange={(e) => setNote(e.target.value)} />
                </Box>
                <Box sx={{ textAlign: 'center', background: '#FFAA47', p: 2, mt: 2, borderRadius: '5px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', color: 'white !important' }}>
                    <Typography >Tổng </Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}>{quantity * total} xu </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', color: 'white !important' }}>
                    <Typography >Bạn sẽ buff </Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}> {quantity.toLocaleString('en-US')}  tương tác </Typography>
                    <Typography >với giá</Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}>{total.toLocaleString('en-US')} / tương tác </Typography>
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