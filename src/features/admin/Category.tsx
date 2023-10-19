import { Box, CssBaseline, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogCategory } from 'components/Common';
import { getAllCategory, deleteCategory, deleteChildrenCategory } from 'utils/apis/category';
import { ICategory } from 'models';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Category = () => {

  const [rows, setRows] = useState<ICategory[]>([])
  const [child, setChild] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<ICategory>()

  const handleCloseDialog = () => {
    setOpen(!open)
  }
  const handleParent = (data: ICategory | undefined) => {
    setData(data)
    setChild("")
    handleCloseDialog()
  }
  const handleChild = (data: ICategory | undefined, child: string) => {
    setData(data)
    setChild(child)
    handleCloseDialog()
  }
  const addChild = (data: ICategory | undefined)=>{
    setData(data)
    setChild("1111")
    handleCloseDialog()
  }
  const loadCategory = async () => {
    let data = await getAllCategory()
    if (data.code === 200) {
      setRows(data.data)
    }
  }
  useEffect(() => {
    loadCategory()
  }, [])
  const onDeleteCategory = async (id: string) => {
    let data = await deleteCategory(id)
    if (data.code !== 200) {
      toast.error(data.message)
    } else {
      toast.success('Xóa danh mục thành công')
      loadCategory()
    }
  }
  const onDeleteChildren = async (id: string, id_children: string) => {
    let data = await deleteChildrenCategory(id, id_children)
    if (data.code !== 200) {
      toast.error(data.message)
    } else {
      toast.success('Xóa danh mục con thành công')
      loadCategory()
    }
  }
  const addParent = ()=>{
    setData(undefined)
    setChild('')
    handleCloseDialog()
  }
  return (
    <Box sx={{ m: 2, borderRadius: '1px' }} className='admin-account'>
      <CssBaseline />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>Danh mục cha</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>Danh mục con</Item>
          </Grid>
          {rows.map((row) => (
            <React.Fragment key={row?._id}>
              <Grid item xs={4} sx={{ display: 'flex',alignSelf: 'center' }} >
                <Item sx={{ minHeight: '36px', cursor: 'pointer', width: '100%' }} onClick={() => handleParent(row)}>{row?.name}
                </Item>
                <DeleteIcon sx={{ float: 'inline-end', alignSelf: 'center', cursor: 'pointer' }} onClick={() => onDeleteCategory(row?._id)} />
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", flexWrap: "wrap" }}  >
                  {row.children !== null && row.children !==undefined && row.children.map((child) => (
                    <React.Fragment key={child?.id}>
                      <Item onClick={() => handleChild(row, child?.id)}>{child.name}</Item>
                      <DeleteIcon sx={{ float: 'inline-end', alignSelf: 'center', cursor: 'pointer' }} onClick={() => onDeleteChildren(row?._id, child?.id)} />
                    </React.Fragment>
                  ))}
                  <IconButton className="add-button" onClick={() => addChild(row)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12} >
            <Item>
              <IconButton className="add-button" onClick={() => addParent()}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Item>
          </Grid>
        </Grid>
        <DialogCategory data ={data} child={child} open={open} handleClose={handleCloseDialog} loadCategory={loadCategory} />
      </Box >
    </Box >
  )
}
