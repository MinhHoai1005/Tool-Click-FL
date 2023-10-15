/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, TablePagination, Autocomplete } from '@mui/material'
import { IMoney, IAccount } from 'models';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify';
import { DialogMoney } from 'components/Common';
import { getMoney, switchStatusMoney } from 'utils/apis/money';
import { getAllAccount } from 'utils/apis/account';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'number', label: '', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'client_id', label: 'Client ID', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'total', label: 'Số tiền', minWidth: 70, },
  { id: 'reason', label: 'Mô tả', minWidth: 120, },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 100, },
  { id: 'status', label: 'Trạng thái', minWidth: 100, },
  { id: 'action', label: 'Hành động', minWidth: 150, },
];
export const Money = () => {

  const [client_id, setClientId] = useState<number>(0);
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [rows, setRows] = useState<IMoney[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [open, setOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    loadMoney(client_id, 0, +event.target.value);

  };

  const loadMoney = async (client_id: number, page: number, rowsPerPage: number) => {
    let data = await getMoney(client_id, page, rowsPerPage)
    if (data.code === 200) {
      setRows(data.data.data)
    }
  }
  const loadAccount = async (client_id:number) => {
    let data = await getAllAccount(client_id,0,100)
    if (data.code === 200) {
      setAccounts(data.data)
    }
  }
  useEffect(() => {
    loadMoney(client_id, page, rowsPerPage)
    loadAccount(0)
  }, [])

  const onSwitchStatus = async (id: string, status: number) => {
    let data = await switchStatusMoney(id, status)
    if (data.code === 200) {
      toast.success('Thay đổi trạng thái thành công')
      loadMoney(client_id, page, rowsPerPage)
    } else {
      toast.error(data.message)
    }
  }
  const showDialog = () => {
    setOpen(!open);
  }
  const handleChange = (event, newValue) => {
    loadMoney(newValue?.client_id,page,rowsPerPage)
  };
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='admin-account'>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Lịch sử nạp tiền</Typography>
        <Autocomplete
          onChange={handleChange}
          id="searchable-select"
          options={accounts === undefined ? [] : accounts}
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
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align='center'>
                      #{index}
                    </TableCell>
                    <TableCell>
                      {row.client_id}
                    </TableCell>
                    <TableCell align="right">{row.total.toLocaleString('en-US')}</TableCell>
                    <TableCell align="left">{row.reason}</TableCell>
                    <TableCell align="left">{moment(row.created_date)?.format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell sx={{ color: row.status === 5 ? "green" : row.status === 3 ? "blue" : "red" }}>
                      {row.status === 5 ? "Đã được duyệt" : row.status === 3 ? "Chờ xác nhận" : "Đã bị từ chối"}
                    </TableCell>
                    <TableCell align="center" sx={{ cursor: 'pointer', position: 'relative', display: 'flex' }}>
                      {row.status === 3 ? (
                        <Box>
                          <Button sx={{ color: "red", cursor: 'pointer' }} onClick={() => onSwitchStatus(row.id, 1)}>Từ chối</Button>
                          <Button sx={{ cursor: 'pointer' }} onClick={() => onSwitchStatus(row.id, 5)}>Xác nhận</Button>
                        </Box>
                      ) : (<Box>
                        <Button></Button>
                      </Box>)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <DialogMoney open={open} rows={accounts} showDialog={showDialog} loadData={loadMoney} />
    </Box>
  )
}
