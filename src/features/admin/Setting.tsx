import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { CssBaseline, Box, Tab, Typography, IconButton, TableHead, TableRow, TableCell, Paper, TableBody, TableContainer, Table } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogSetting } from 'components/Common'
import { ICategory, ISetting } from 'models'
import { getAllSetting, deleteSetting } from 'utils/apis/setting'
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
import { getAllCategory } from 'utils/apis/category'


export const Setting = () => {
    //Tab
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<ISetting>()
    const [rows, setRows] = useState<ISetting[]>([])
    const [categorys, setCategorys] = useState<ICategory[]>([])
    const handleCloseDialog = () => {
        setOpen(!open)
    }

    const addSetting = () => {
        setOpen(true)
    }
    const loadHappy = async () => {
        let data = await getAllSetting()
        if (data.code === 200) {
            setRows(data.data)
        }
    }
    const viewDetail = (row: ISetting) => {
        setData(row)
        setOpen(true)
    }
    const onDelete = async (id: string) => {
        let data = await deleteSetting(id)
        if (data.code !== 200) {
            toast.error(data.message)
        } else {
            toast.success('Xóa thông tin thành công')
            loadHappy()
        }
    }
    const loadCategory = async () => {
        let data = await getAllCategory()
        if (data.code === 200) {
            setCategorys(data.data)
        }
    }
    const addConfig = async () => {

    }
    useEffect(() => {
        loadHappy()

    }, [])

    return (
        <Box sx={{ m: 2, borderRadius: '1px' }} className='layout-post'>
            <CssBaseline />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Danh sách cảm xúc" value="1" />
                            <Tab label="Config bản giá" value="2" onClick={loadCategory} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Typography sx={{ alignSelf: 'center' }}>Danh sách cảm xúc</Typography>
                        {rows.map((row) => (
                            <Box key={row._id} sx={{ display: 'flex' }} >
                                <Typography sx={{ alignSelf: 'center', minWidth: '200px' }} onClick={() => viewDetail(row)}>{row.name}</Typography>
                                <img src={row.image} alt={row.name} style={{ width: '30px', height: '30px' }} />
                                <DeleteIcon sx={{ float: 'inline-end', alignSelf: 'center', cursor: 'pointer' }} onClick={() => onDelete(row?._id)} />
                            </Box>
                        ))}
                        <IconButton className="add-button" onClick={() => addSetting()}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </TabPanel>
                    <TabPanel value="2">
                        <Typography>Danh sách bảng giá</Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={2}>
                                            Danh mục
                                        </TableCell>
                                        <TableCell align="center" colSpan={rows.length + 1}>Giá</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Danh mục cha</TableCell>
                                        <TableCell align="center">Danh mục con</TableCell>
                                        {rows.map((row) => (
                                            <TableCell align="center" key={row._id}>{row.name}</TableCell>
                                        ))}
                                        <TableCell align="center">Tương tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell sx={{border:'1px solid'}}>Danh mục a</TableCell>
                                        <TableCell align="left" sx={{border:'1px solid'}}>Danh mục b</TableCell>
                                        {rows.map((row) => (
                                            <TableCell align="right"sx={{border:'1px solid'}} key={row._id}></TableCell>
                                        ))}
                                        <TableCell align="right"sx={{border:'1px solid'}}>Tương tác</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabContext>
            </Box>
            <DialogSetting data={data} open={open} handleClose={handleCloseDialog} loadData={loadHappy} />
        </Box >
    )
}
