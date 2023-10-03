import { Box, Button, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React from 'react'
import './style.scss'
import moment from 'moment'

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const rows = [
  {
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111
  }
]
const columns: Column[] = [
  { id: 'number', label: '', minWidth: 50, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'client_id', label: 'ClientID', minWidth: 50, format: (value: number) => value.toLocaleString('en-US'), },
  {
    id: 'full_name',
    label: 'Tên người dùng',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Emai',
    minWidth: 100,
  },
  {
    id: 'facebook',
    label: 'FacebookID',
    minWidth: 150,
  },
  {
    id: 'facebook',
    label: 'Số DT',
    minWidth: 100,
  },
  {
    id: 'created_date',
    label: 'Ngày tạo',
    minWidth: 120,
  },
  {
    id: 'money',
    label: 'Tiền trong ví',
    minWidth: 100,
  },
];
export const Account = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='admin-account'>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Thông tin người dùng</Typography>
        <Button>Nạp tiền</Button>
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
                    <TableCell align="left">{row.full_name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.facebook_id}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{moment(row.created_date)?.format('DD/MM/YYYY HH:ss')}</TableCell>
                    <TableCell align="right">{row.money.toLocaleString('en-US')}</TableCell>
                    <TableCell align="center" sx={{ cursor: 'pointer',position:'relative' }}>
                      <Typography>....</Typography>
                      <Box style={{ display: 1 == 1 ? "block" : "none" }}className='show-action'>
                      <Typography>Cập nhật</Typography>
                      <Typography>Nạp tiền</Typography>
                      <Typography>Active</Typography>
                      <Typography>Xóa</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Box>
    </Box>
  )
}
