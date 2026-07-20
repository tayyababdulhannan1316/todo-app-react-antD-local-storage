import { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext()
const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [state, setState] = useState(initialState)

  const readProfile = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null

    if (user) {
      setState({ isAuth: true, user })
    } else {
      setState(initialState)
    }
    setTimeout(() => {
      setIsAppLoading(false)
    }, 500)
  }

  useEffect(() => { readProfile() }, [])

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setState({ isAuth: true, user })
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setState(initialState)
  }

  return (
    <Auth.Provider value={{ ...state, isAppLoading, handleLogin, handleLogout }}>
      {children}
    </Auth.Provider>
  )
}

export default AuthContext

export const useAuthContext = () => useContext(Auth)




