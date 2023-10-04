import {
  Box, Button, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Typography, Switch, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import './style.scss'
import moment from 'moment'
import ShowDialog from 'components/Common/ShowDialog';
import { ActionDialog } from 'models';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const rows = [
  {
    id: "BAC",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BAZ",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BDC",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BHC",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BACS",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 0,
  },
  {
    id: "BACD",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BACQ",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BAC1",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BA2",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BA3",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 0,
  },
  {
    id: "BA5",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BAC6",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BAC7",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  },
  {
    id: "BAC8",
    client_id: 111111,
    full_name: "Nguyễn Văn A",
    email: "a@toolplus.com",
    facebook_id: "486136149116",
    phone: '0337289172',
    created_date: new Date(),
    money: 1111111,
    status: 1,
  }

]
const columns: Column[] = [
  { id: 'number', label: '', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'client_id', label: 'ClientID', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  {
    id: 'full_name',
    label: 'Tên người dùng',
    minWidth: 120,
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
const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface AccountProps {
}

export const Account: React.FC<AccountProps> = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dataShoDialog, setDataShoDialog] = React.useState<ActionDialog | undefined>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickDialog = (value: boolean) => {
    setOpen(value);
  };
  const onAgree = (value: boolean) => {
    if (value) {
      console.log("Đổi trạng thái thành công")
    }
    setDataShoDialog(undefined)
    handleClickDialog(false)
  }
  const onActionSwitchStatus = (value: any, status: number) => {

    let inputs = {
      title: "1",
      span: "2",
      onAgree: onAgree,
    }
    setDataShoDialog(inputs)
    handleClickDialog(true)

  }
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
                    <TableCell align="center" sx={{ cursor: 'pointer', position: 'relative', display: 'flex' }}>
                      <IconButton className="check-button" onClick={() => onActionSwitchStatus(row.id, row.status === 1 ? 0 : 1)} >
                        <Switch {...label} checked={row.status === 1 ? true : false} />
                      </IconButton>
                      <IconButton className="delete-button" onClick={() => onActionSwitchStatus(row.id, -1)}>
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ShowDialog onActionShow={handleClickDialog} open={open} data={dataShoDialog} />
      </Box>
    </Box>
  )
}
