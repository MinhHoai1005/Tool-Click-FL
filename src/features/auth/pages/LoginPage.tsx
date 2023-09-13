import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react'
import { authAction } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: '4px'
  },
}));

export function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoginIn = useAppSelector(state => state.auth.logging)

  const handleLoginClick = () => {
    dispatch(authAction.login({ email: '', password: '' }))
  }


  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant='h5' component='h1'>Admin page</Typography>
        <Box mt={4}>
          <Button variant='contained' color='primary' onClick={handleLoginClick}>
            {isLoginIn && <CircularProgress size={20} color='secondary' />} &nbsp;
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  )
}