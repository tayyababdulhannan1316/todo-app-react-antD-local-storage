import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Flex, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";


const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {isAuth, handleLogout} = useAuthContext()
  

  const items = [
    { key: "/", label: <Link to="/">Home</Link>,}
    
  ];

  
  return (

    <Header style={{background: "#1d3550", padding: "10px 40px", }}>
      <Flex justify="space-around" align="center">
        {/* Logo */}
        <Title level={4} style={{color: "#fff", margin: 0, fontFamily:"ui-sans-serif",fontWeight:"bold",fontSize:30}} >
          <Link to="/" style={{color: "#fff",textDecoration: "none",}}>
            React Todos
          </Link>
        </Title>

        {/* Menu */}
        <Menu
          mode= "horizontal"
          theme= "dark"
          selectedKeys={[location.pathname]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            marginLeft: 30,
            background:"transparent",
            fontFamily:"ui-sans-serif",
            fontWeight:"bold",
            fontSize:19,
            // borderBottom: "none",
            
          }}
        />

        {/* Buttons */}
        {!isAuth
        ?
        <>
        <Flex gap={10}>

            <Button size="large"  color="green" variant="solid" onClick={()=>{navigate("/auth/login")}} >Login</Button>
            
            <Button size="large"  color="blue" variant="solid" onClick={()=>{navigate("/auth/register")}} >Register</Button>
       
        </Flex>
        </>
        :
        <>
           <Flex gap={10}>
          
            <Button size="large"  color="green" variant="solid" onClick={()=>{navigate("/dashboard")}} >Dashboard</Button>
           
            <Button type="dashed" size="large" color="red" variant="solid" onClick={handleLogout} >Logout</Button>
         
        </Flex>
        </>
        }
      </Flex>
    </Header>
  );
};

export default Navbar;




// import { Space } from "antd";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-primary navbar-dark py-2" >
//   <div className="container">
//     <Link to = "/" className="navbar-brand" >React Todos</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link to="/" className="nav-link active" aria-current="page">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/about" className="nav-link">About</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/contact" className="nav-link">Contact</Link>
//         </li>
//       </ul>
//         <div className="d-flex ms-auto">
//          <Space>
//            <Link to="/auth/login" className="btn btn-success">Login</Link>
//           <Link to="/auth/register" className="btn btn-info ">Register</Link>
//          </Space>
//         </div>
//     </div>
//   </div>
// </nav>
//   )
// }

// export default Navbar