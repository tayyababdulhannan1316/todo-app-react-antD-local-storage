import { useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useNavigate , Link } from "react-router-dom";

const { Title , Paragraph} = Typography;
const initialState = {fullName:"",email:"",password:"",confirmPassword:""}

const Register = () => {
  const [state , setState] = useState(initialState)
  const [isProcessing , setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(s=> ({...s, [e.target.name]: e.target.value}))

  const handleRegister = ()=>{
    let {fullName,email,password,confirmPassword} = state

    fullName = fullName.trim()

    if(fullName.length<3){return window.toastify("Please enter your full name","error")}
    if(!window.isValidEmail(email)) {return window.toastify("Please enter valid email","error")}
    if(password.length<6) {return window.toastify("Password length should be at least 6","error")}    
    if(password !== confirmPassword)  {return window.toastify("password does not match","error")}
 
  
    const user = {uid:window.getRandomId(),fullName,email,password,status:"pending",role:"customer", createdAt:new Date().getTime()}
    
    const users = JSON.parse(localStorage.getItem("users"))||[]
    const isUserFound = users.find((user)=> user.email===email)
    if(isUserFound){
      setIsProcessing(false)
      return window.toastify("user already exist","error")}

    setIsProcessing(true)
    users.push(user)
    localStorage.setItem("users",JSON.stringify(users))
    setTimeout(() => {      
      setIsProcessing(false)
    }, 500);
    window.toastify("A new user has been registered successfully","success")
   navigate("/auth/login")
    
  }
  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3 p-4 mx-auto">
          <Title level={1} className="text-center mb-5">
            Register
          </Title>
          <Divider />
          <Form layout="vertical">
           <Row>
            <Col span={24}>
              <Form.Item label="Full Name" name="fullName"  required>
                <Input size="large" type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email"  required>
                <Input size="large" type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" name="password"  required >
                <Input.Password size="large" name="password"  placeholder="Enter your password" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Confirm Password" name="confirmPassword" required >
                <Input.Password size="large" name="confirmPassword"  placeholder="Please confirm your password" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" size="large" block loading={isProcessing} onClick={handleRegister}>Register</Button>
            </Col>
            <Col span={24}>
            <Paragraph className="text-center mt-3">
                Already have an account? <Link to="/auth/login">Login</Link>
              </Paragraph>
            </Col>
           </Row>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Register;
