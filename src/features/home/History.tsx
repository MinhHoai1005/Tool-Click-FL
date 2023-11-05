import { Autocomplete, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { IHistoryUser } from 'models';
import { processClientID } from 'utils/apis/process';
import { groupBy } from 'utils';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'number', label: 'STT', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'action', label: 'Hành động', minWidth: 170 },
  { id: 'link', label: 'Đối Tượng ', minWidth: 70, },
  { id: 'total', label: 'Tổng tiền', minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'note', label: 'Chú ý', minWidth: 150, },
  { id: 'status', label: 'Trạng thái', minWidth: 120, },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 100, },
];

interface Autocomplete {
  name: string;
}

interface HistoryProps {

}
export const History: React.FC<HistoryProps> = (props) => {

  const [rows, setRows] = useState<IHistoryUser[]>([]);
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [optionsCategory, setOptionsCategory] = useState<Autocomplete[]>([])
  const [optionsLink, setOptionsLink] = useState<Autocomplete[]>([])
  const [link, setLink] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const loadHistory = async (category: string, link: string, page: number, rowsPerPage: number) => {
    if (page === 0) {
      page = 1;
    }
    let data = await processClientID(category,link,page, rowsPerPage)
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
  const loadHistoryData = async (category: string, link: string, page: number, rowsPerPage: number) => {
    if (page === 0) {
      page = 1;
    }
    let data = await processClientID(category,link,page, rowsPerPage)
    if (data.code === 200) {
      setRows(data.data)
    }
  }
  const handleChangeCategory = (event, newValue) => {
    if (newValue === null) {
      loadHistoryData('',link,page, rowsPerPage)
      setCategory('')
    } else {
      setRowsPerPage(10);
      setPage(0);
      setCategory(newValue.name)
      loadHistoryData(newValue.name,link,page, rowsPerPage)
    }
  };
  const handleChangeLink = (event, newValue) => {
    if (newValue === null) {
      loadHistoryData(category,'',page, rowsPerPage)
      setLink('')
    } else {
      setRowsPerPage(10);
      setPage(0);
      setLink(newValue.name)
      loadHistoryData(category,newValue.name,page, rowsPerPage)
    }
  };
  useEffect(() => {
    loadHistory('','',page, rowsPerPage)
  }, [])
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px', m: 4 }}>
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
                    {row.category}
                  </TableCell>
                  <TableCell align="left">  {row.link}</TableCell>
                  <TableCell align="right">{row.total.toLocaleString('en-US')}</TableCell>
                  <TableCell align="left">{row.note}</TableCell>
                  <TableCell sx={{ color: row.status === 5 ? "green" : row.status === 3 ? "blue" : "red" }}>
                    {row.status === 5 ? "Đã được duyệt" : row.status === 3 ? "Chờ xác nhận" : "Đã bị từ chối"}
                  </TableCell>
                  <TableCell align="left">{moment(row.created_date)?.format('DD/MM/YYYY HH:mm')}</TableCell>
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
