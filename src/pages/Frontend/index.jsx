import { Routes , Route} from "react-router-dom"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Home from "./Home"
import NotFound from "@/components/Misc/NotFound"



const Frontend = () => {
  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>

    <Footer />
    </>
  )
}

export default Frontend