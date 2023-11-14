import { Box, CssBaseline, Tab, Typography, Input, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.scss'
import { toast } from 'react-toastify';
import { IAccountUpdate } from 'models';
import { updateAccount } from 'utils/apis/account';
interface AccountProps {

}
const user = localStorage.getItem('user')

export const Account: React.FC<AccountProps> = (props) => {

  const [accounts, setAccounts] = useState<IAccountUpdate>({}as IAccountUpdate)
  //Tab
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccounts((inputs) => ({ ...inputs, [name]: value }));
  };
  useEffect(() => {
    if (user) {
      const userObject = JSON.parse(user);
      setAccounts((account) => ({
        ...account,
        'client_id': userObject?.client_id,
        'email': userObject.email,
        'total': userObject.total,
        "user_name": userObject.user_name,
        "phone": userObject.phone,
        "facebook": userObject.facebook,
      }));
    }
  }, [])
  const onSubmit =async () => {
    if (accounts?.new_pass_word !== accounts?.reply_pass_word) {
      toast.error("Mật khẩu mới và nhập lại không khớp")
      return
    }

    const phoneRegex = /^(0[0-9]{9,10})$/;
    if (!phoneRegex.test(accounts?.phone as string)) {
      toast.error("Số điện thoại không đúng địn dạng")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accounts?.email as string)) {
      toast.error("Email không đúng định dạng")
      return
    }
    let data =await updateAccount(accounts)
    if (data.code ===200){
      toast.success("Cập nhật thông tin thành công")
    }else{
      toast.error(data.message)
    }
  }
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='layout-post'>
      <CssBaseline />
      <Typography variant="h5" component="h5" sx={{ textTransform: 'uppercase' }}>
        Tài khoản
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-placeholder="lab API tabs example">
              <Tab placeholder="Thông tin tài khoản" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box >
              <Box >
              <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>ID khách hàng</Typography>
                  <Input fullWidth value={accounts?.client_id} name="client_id" disabled onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Tên Tài Khoản</Typography>
                  <Input fullWidth value={accounts?.user_name} name="user_name" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Email</Typography>
                  <Input fullWidth value={accounts?.email} name="email" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Facebook ID (Nhập Link Facebook của bạn)</Typography>
                  <Input placeholder="Nhập id facebook của bạn" fullWidth value={accounts?.facebook} name="facebook" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Mật khẩu cũ</Typography>
                  <Input type="password" placeholder="Nhập mật khẩu cũ" fullWidth value={accounts?.pass_word} name="pass_word" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Mật khẩu mới</Typography>
                  <Input type="password" placeholder="Nhập mật khẩu mới" fullWidth value={accounts?.new_pass_word} name="new_pass_word" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Nhập lại mật khẩu mới</Typography>
                  <Input type="password" placeholder="Nhập lại mật khẩu mới" fullWidth value={accounts?.reply_pass_word} name="reply_pass_word" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', paddingTop: '10px' }}>
                  <Typography sx={{ width: '200px', alignSelf: 'center' }}>Số điện thoại</Typography>
                  <Input placeholder="Nhập số điện thoại" fullWidth value={accounts?.phone} name="phone" onChange={handleInput} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <Button onClick={onSubmit}>Cập nhật</Button>
                </Box>
              </Box>

            </Box>

          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}


