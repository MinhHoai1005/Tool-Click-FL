/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box, Button, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, Switch, IconButton, TablePagination, TextField, Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import './style.scss'
import moment from 'moment'
import { IAccount } from 'models';
import { getAllAccount, switchStausAccount,getAccount } from 'utils/apis/account';
import { toast } from 'react-toastify';
import { DialogMoney } from 'components/Common';
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'number', label: '', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'client_id', label: 'ClientID', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'full_name', label: 'Tên người dùng', minWidth: 120, },
  { id: 'email', label: 'Emai', minWidth: 100, },
  { id: 'facebook', label: 'FacebookID', minWidth: 150, },
  { id: 'phone', label: 'Số DT', minWidth: 100, },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 120, },
  { id: 'money', label: 'Tiền trong ví', minWidth: 100, },
];
const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface AccountProps {
}

export const Account: React.FC<AccountProps> = (props) => {

  const [keyword, setKeyWord] = useState<number>(0);
  const [rows, setRows] = useState<IAccount[]>([]);
  const [options, setOptions] = useState<IAccount[]>([]);
  const [open, setOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    loadAccount(keyword, 0, +event.target.value);

  };

  const onActionSwitchStatus = async (id: string, status: number) => {
    let data = await switchStausAccount(id, status);
    if (data.code !== 200) {
      toast.error(data.message)
    } else {
      toast.success('Thay đổi trạng thái thành công')
      loadAccount(keyword, page, rowsPerPage)
    }
  }
  const loadAccount = async (client_id: number, page: number, rowsPerPage: number) => {

    let data = await getAllAccount(client_id, page, rowsPerPage)
    if (data.code === 200) {
      setRows(data.data)
    }
  }

  const showDialog = () => {
    setOpen(!open);
  }
  const handleChange = (event, newValue) => {
    loadAccount(newValue?.client_id, page, rowsPerPage)
  };
  const loadAll =async()=>{
    let data = await getAccount()
    if (data.code === 200) {
      setOptions(data.data)
    }
  }
  useEffect(() => {
    loadAccount(0, page, rowsPerPage)
    loadAll()
  }, [])
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='admin-account'>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Thông tin người dùng</Typography>
        <Autocomplete
          onChange={handleChange}
          id="searchable-select"
          options={options === undefined ? [] : options}
          getOptionLabel={(option) => `${option.client_id} - ${option.user_name}`}
          renderInput={(params) => <TextField {...params} label="Người dùng" />}
          sx={{width: '50%'}}
        />
        <Button onClick={showDialog}>Nạp tiền</Button>
      </Box>
      <Box>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 0, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows !== undefined && rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align='center'>
                      #{index}
                    </TableCell>
                    <TableCell>
                      {row.client_id}
                    </TableCell>
                    <TableCell align="left">{row.user_name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.uid}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{moment(row.created_date)?.format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell align="right">{row?.total.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center" sx={{ cursor: 'pointer', position: 'relative', display: 'flex' }}>
                      <IconButton className="check-button" onClick={() => onActionSwitchStatus(row._id, row.status === 5 ? 3 : 5)} >
                        <Switch {...label} checked={row.status === 5 ? true : false} />
                      </IconButton>
                      <IconButton className="delete-button" onClick={() => onActionSwitchStatus(row._id, 1)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows === undefined ? 0 : rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <DialogMoney open={open} rows={rows} showDialog={showDialog} loadData={loadAccount} />
    </Box>
  )
}

