import { Box, CssBaseline, Tab, Typography, TextField, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react'
import { formatIntToString } from 'utils';
import './styles.scss'
import { getAllSetting, getPrice } from 'utils/apis/setting';
import { ISetting, IConfig } from 'models';
import classnames from "classnames";
import { Note } from './data'
import { History } from './History'
import { createProcess } from 'utils/apis/process';
import { toast } from 'react-toastify';

interface PostProps {
  id: string,
}
export const Post: React.FC<PostProps> = (props) => {
  const { id } = props;
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
  const [happys, setHappys] = useState<ISetting[]>([])
  const [idHappy, setIdHappy] = useState<ISetting>();
  const [prices, setPrices] = useState<IConfig[]>([])

  const loadHappy = async () => {
    let data = await getAllSetting()
    if (data.code === 200) {
      setHappys(data.data)
      if (data.data.length > 0) {
        if (idHappy === undefined) {
          setIdHappy(data.data[0])
        }
        loadTotal(data.data[0]._id)
      }
    }
  }
  const loadTotal = async (value: string) => {
    let num = prices.find((id) => id.happy === value)?.price
    if (num === undefined) {
      num = 0
    }
    setTotal(num)
    setPrice(num)
  }
  const loadPrice = async (id: string) => {
    let data = await getPrice(id)
    if (data.code === 200) {
      setPrices(data.data)
    }
  }
  useEffect(() => {
    loadHappy();
  }, [idHappy?._id])
  useEffect(() => {
    loadPrice(id);
  }, [id])
  const onHappyClick = async (happy: ISetting) => {
    setIdHappy(happy)
    loadTotal(happy._id)
  }
  const onSubmit = async () => {
    if (total < price) {
      toast.error("Giá tiền mỗi tương tác không được thấp hơn " + price)
      return
    }
    let data = await createProcess(id, total, quantity, url, note)
    if (data.code === 200) {
      toast.success('Tạo mới tiến trình thành công')
      setTotal(0)
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
            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px' }}>
              <Box >
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Link hoặc ID bài viết:</Typography>
                  <TextField variant="outlined" fullWidth multiline value={url} onChange={(e) => setUrl(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Typography sx={{ minWidth: '200px', alignSelf: 'center' }}>Chọn cảm xúc:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {happys.map((happy) => (
                      <img
                        style={{ width: '40px', height: '40px' }}
                        className={classnames({
                          "happy-click-img": idHappy?._id === happy._id ? true : false,
                        })}
                        onClick={() => onHappyClick(happy)}
                        key={happy._id} src={happy.image} alt={happy.name} />
                    ))}
                  </Box>
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
                    <Typography sx={{ fontWeight: 'bold !important' }}> {quantity.toLocaleString('en-US')}  {idHappy?.name} </Typography>
                    <Typography >với giá</Typography>
                    <Typography sx={{ fontWeight: 'bold !important' }}>{total.toLocaleString('en-US')} / love </Typography>
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
            <History id ={id}/>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}
