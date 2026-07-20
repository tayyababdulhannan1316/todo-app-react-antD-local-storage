import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/context/Auth'

const ProtectedRoute = ({ Component }) => {
  const { isAuth } = useAuthContext()

  return isAuth ? <Component /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute