import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"
import Settings from "./Settings"
import NotFound from "@/components/Misc/NotFound"
import Todos from "./Todos"

const Dashboard = () => {
  return (
    <>
    {/* <Profile /> */}
   <Routes>
    <Route index element={<Home />} />
    <Route path='profile' element={<Profile />} />
    <Route path='settings' element={<Settings />} />
    <Route path="todos/*" element={<Todos />} />
    <Route path="*" element={<NotFound />} />
   </Routes>
    </>
  )
}

export default Dashboard