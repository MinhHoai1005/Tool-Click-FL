import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const isLoginIn = Boolean(localStorage.getItem('access_token'))

  return (
    isLoginIn ? <Outlet /> : <Navigate to='/login' />
  )
}
export default PrivateRoutes