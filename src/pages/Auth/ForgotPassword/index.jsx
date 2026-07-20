import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";

const { Title , Paragraph} = Typography;
const initialState = { email: "" }

const ForgotPassword = () => {

  const { handleLogin } = useAuthContext()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    let { email } = state
    console.log('email :>> ', email);
    navigate("/")
    // setIsProcessing(true)

    // const users = JSON.parse(localStorage.getItem("users")) || []
    // const user = users.find((user) => user.email === email && user.password === password)

    // if (!user) {
    //   setIsProcessing(false)
    //   return window.toastify("Invalid email or password","error")
    // }
    // setTimeout(() => {      
    //   handleLogin(user)
    //   window.toastify("Login successful","success")
    //   setIsProcessing(false)
    //   navigate("/")
    // }, 500);
  }

  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3">
          <Title level={1} className="text-center mb-5">Reset Password </Title>
          <Divider />
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <Form.Item label="Email" name="email" required>
                  <Input size="large" type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button type="primary" size="large" block loading={isProcessing} onClick={handleSubmit}>Send Email</Button>
              </Col>
               <Col span={24}>
                  <Paragraph className="text-center mt-3">
                Remember Password? <Link to="/auth/login">Login</Link>
              </Paragraph>
            </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;