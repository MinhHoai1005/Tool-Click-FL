import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment'
import { IHistory } from 'models';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'number', label: 'STT', minWidth: 30, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'link', label: 'Link hoặc Id bài viết', minWidth: 170 },
  { id: 'quantity', label: 'Số lượng', minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'total', label: 'Số tiền', minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'price', label: 'Tổng', minWidth: 70, format: (value: number) => value.toLocaleString('en-US'), },
  { id: 'note', label: 'Chú ý', minWidth: 150, },
  { id: 'status', label: 'Trạng thái', minWidth: 120, },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 100, },
];

interface HistoryProps {
  rows: IHistory[]
}
export const History: React.FC<HistoryProps> = (props) => {

  const { rows } = props;
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  return (
    <Box>

      <Box>

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
                    <TableCell align="left">
                      {row.link}
                    </TableCell>
                    <TableCell align="right">{row.quantity.toLocaleString('en-US')}</TableCell>
                    <TableCell align="right">{row.total.toLocaleString('en-US')}</TableCell>
                    <TableCell align="right">{(row.quantity * row.total).toLocaleString('en-US')}</TableCell>
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
    </Box>
  )
}
