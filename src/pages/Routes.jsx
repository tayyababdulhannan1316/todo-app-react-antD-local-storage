import React from 'react'
import { Route, Routes , Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'
import ProtectedRoute from '@/components/Misc/ProtectedRoute'
import { useAuthContext } from '@/context/Auth'


const Index = () => {
  const {isAuth} = useAuthContext()
  return (
    <>
    <Routes>
        <Route path = "/*" element = {<Frontend />} />
        <Route path = "/auth/*" element = {!isAuth ? <Auth />: <Navigate to="/" />} />
        <Route path = "/dashboard/*" element = {<ProtectedRoute Component={Dashboard} />} />
        
    </Routes>
    </>
  )
}

export default Index