import './App.scss'
import "bootstrap/dist/js/bootstrap.bundle"
import { ConfigProvider } from 'antd'

import Routes from '@/pages/Routes'
import ScreenLoader from '@/components/Misc/ScreenLoader'
import { useAuthContext } from '@/context/Auth'

function App() {
  const {isAppLoading} = useAuthContext()


  return (
    <>
      <ConfigProvider theme={{token: {colorPrimary: '#1d3550'},
      components: {Button: {controlOutlineWidth: 0}}}}>
      {!isAppLoading
      ?
      <Routes />
      :
      <ScreenLoader />
      }
      </ConfigProvider>
      
    </>
  )
}

export default App
