import { Box, CssBaseline, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogCategory } from 'components/Common';
import { getAllCategory } from 'utils/apis/category';
import { ICategory } from 'models';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Category = () => {

  const [rows, setRows] = useState<ICategory[]>([])
  const [id, setId] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const handleCloseDialog = () => {
    setOpen(!open)
  }
  const handleParent = (id: string) => {
    setId(id)
    handleCloseDialog()
  }
  const loadCategory = async () => {
    let data = await getAllCategory()
    if (data.code === 200) {
      setRows(data.data)
      console.log(data.data)
    }
  }
  useEffect(() => {
    loadCategory()
  }, [])
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
              <Grid item xs={4} >
                <Item sx={{ minHeight: '36px', cursor: 'pointer' }} onClick={() => handleParent(row?._id)}>{row?.name}</Item>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", flexWrap: "wrap" }}  >
                {row?.children === null ? (
                  <Item sx={{ width: "100%" }}>Chưa có danh mục con</Item>
                ) : (<>
                  {row.children !== undefined && row.children.map((child) => (
                    <Item >abc</Item>
                  ))}
                </>
                )}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12} >
            <Item>
              <IconButton className="add-button" onClick={() => handleParent("")}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Item>
          </Grid>
        </Grid>
        <DialogCategory id={id} open={open} handleClose={handleCloseDialog} loadCategory={loadCategory} />
      </Box >
    </Box >
  )
}
