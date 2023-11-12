import { Autocomplete, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IAccount, IProcessUser } from 'models';
import { processAll, updateStatusProcess } from 'utils/apis/process';
import { groupBy } from 'utils';
import { getAccount } from 'utils/apis/account';
import { toast } from 'react-toastify'

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'number', label: 'STT', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'client_id', label: 'Id khách hàng', minWidth: 170 },
  { id: 'action', label: 'Hành động', minWidth: 170 },
  { id: 'link', label: 'Đối Tượng ', minWidth: 70, },
  { id: 'total', label: 'Tổng tiền', minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'note', label: 'Chú ý', minWidth: 150, },
  { id: 'status', label: 'Trạng thái', minWidth: 120, },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 100, },
  { id: 'action', label: 'Hành động', minWidth: 150, },
];

interface Autocomplete {
  name: string;
}
interface ProcessProps {

}
export const Process: React.FC<ProcessProps> = (props) => {

  const [rows, setRows] = useState<IProcessUser[]>([]);
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [optionsCategory, setOptionsCategory] = useState<Autocomplete[]>([])
  const [optionsLink, setOptionsLink] = useState<Autocomplete[]>([])
  const [optionsClientId, setOptionsClientId] = useState<IAccount[]>([])
  const [link, setLink] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [clientId, setClientId] = useState<number>(0)

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const loadProcess = async (client_id: number, category: string, link: string, page: number, rowsPerPage: number) => {
    if (page === 0) {
      page = 1;
    }
    let data = await processAll(client_id, category, link, page, rowsPerPage)
    if (data.code === 200) {
      setRows(data.data)
      let categorys: Autocomplete[] = []
      let groupData = groupBy(data.data, i => i.category)
      for (let group in groupData) {
        let input = {
          name: group,
        }
        categorys.push(input)
      }
      setOptionsCategory(categorys)
      let links: Autocomplete[] = []
      let groupDataLink = groupBy(data.data, i => i.link)
      for (let group in groupDataLink) {
        let input = {
          name: group,
        }
        links.push(input)
      }
      setOptionsLink(links)
    }
  }
  const loadProcessData = async (client_id: number, category: string, link: string, page: number, rowsPerPage: number) => {
    if (page === 0) {
      page = 1;
    }
    let data = await processAll(client_id, category, link, page, rowsPerPage)
    if (data.code === 200) {
      setRows(data.data)
    }
  }
  const handleChangeCategory = (event, newValue) => {
    if (newValue === null) {
      loadProcessData(0, '', link, page, rowsPerPage)
      setCategory('')
    } else {
      setRowsPerPage(10);
      setPage(0);
      setCategory(newValue.name)
      loadProcessData(clientId, newValue.name, link, page, rowsPerPage)
    }
  };
  const handleChangeClientId = (event, newValue) => {
    if (newValue === null) {
      loadProcessData(0, '', link, page, rowsPerPage)
      setClientId(0)
    } else {
      setRowsPerPage(10);
      setPage(0);
      setClientId(newValue.client_id)
      loadProcessData(newValue.client_id, category, link, page, rowsPerPage)
    }
  };
  const handleChangeLink = (event, newValue) => {
    if (newValue === null) {
      loadProcessData(clientId, category, '', page, rowsPerPage)
      setLink('')
    } else {
      setRowsPerPage(10);
      setPage(0);
      setLink(newValue.name)
      loadProcessData(clientId, category, newValue.name, page, rowsPerPage)
    }
  };
  const loadUser = async () => {

    let data = await getAccount()
    if (data.code === 200) {
      setOptionsClientId(data.data)
    }
  }
  const onSwitchStatus = async (id: string, status: number) => {
    let data = await updateStatusProcess(id, status)
    if (data.code === 200) {
      toast.success('Cập nhật trạng thái thành công')
      loadProcess(clientId, category, link, page, rowsPerPage)
    } else {
      toast.error(data.message)
    }
  }
  useEffect(() => {
    loadProcess(0, '', '', page, rowsPerPage)
    loadUser()
  }, [])
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px', m: 4 }}>
        <Autocomplete
          onChange={handleChangeClientId}
          id="searchable-select"
          options={optionsClientId === undefined ? [] : optionsClientId}
          getOptionLabel={(option) => `${option.client_id} - ${option.user_name}`}
          renderInput={(params) => <TextField {...params} label="Id khách hàng" />}
          sx={{ width: '50%' }}
        />
        <Autocomplete
          onChange={handleChangeCategory}
          id="searchable-select"
          options={optionsCategory === undefined ? [] : optionsCategory}
          getOptionLabel={(option) => `${option.name}`}
          renderInput={(params) => <TextField {...params} label="Hành động" />}
          sx={{ width: '50%' }}
        />
        <Autocomplete
          onChange={handleChangeLink}
          id="searchable-select"
          options={optionsLink === undefined ? [] : optionsLink}
          getOptionLabel={(option) => `${option.name}`}
          renderInput={(params) => <TextField {...params} label="Đối tượng" />}
          sx={{ width: '50%' }}
        />
      </Box>
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
                  <TableCell align="left">
                    {row.client_id}
                  </TableCell>
                  <TableCell align="left">
                    {row.category}
                  </TableCell>
                  <TableCell align="left">  {row.link}</TableCell>
                  <TableCell align="right">{row.total.toLocaleString('en-US')}</TableCell>
                  <TableCell align="left">{row.note}</TableCell>
                  <TableCell sx={{ color: row.status === 5 ? "green" : row.status === 3 ? "blue" : "red" }}>
                    {row.status === 5 ? "Đang chạy" : row.status === 3 ? "Chờ xác nhận" : "Chạy thành công"}
                  </TableCell>
                  <TableCell align="left">{moment(row.created_date)?.format('DD/MM/YYYY HH:mm')}</TableCell>
                  <TableCell align="center" sx={{ cursor: 'pointer', position: 'relative', display: 'flex' }}>
                    {row.status === 3 ? (
                      <Box>
                        <Button sx={{ color: "red", cursor: 'pointer' }} onClick={() => onSwitchStatus(row._id, 5)}>Đang chạy</Button>
                        <Button sx={{ cursor: 'pointer' }} onClick={() => onSwitchStatus(row._id, 7)}>Chạy thành công</Button>
                      </Box>
                    ) : row.status === 5 ? (<Box><Button sx={{ cursor: 'pointer' }} onClick={() => onSwitchStatus(row._id, 7)}>Chạy thành công</Button><Button></Button></Box>) : (<Box><Button></Button><Button></Button></Box>)}
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
  )
}

