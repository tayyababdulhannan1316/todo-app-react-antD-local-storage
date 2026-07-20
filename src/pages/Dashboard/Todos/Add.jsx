import { useState } from "react";
import { Button, Col, DatePicker, Form, Input,  Row, Select, Typography } from "antd";
import { useNavigate  } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";

const { Title } = Typography;
const {Item} = Form;
const initialState = { title: "", dueDate: "" , description:"" , priority:"" }

const Add = () => {
  
    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
  
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  
    const handleSubmit = () => {
      let { title,dueDate,description,priority } = state
      title = title.trim()
      if(title.length<3){return window.toastify("Invalid email or password","error")}
      const todo = {title,dueDate,description,priority}
      todo.uid = user.uid
      todo.id = window.getRandomId()
      todo.status = "active"
      todo.isCompleted = false
      todo.createdAt = new Date().getTime()
      setIsProcessing(true)
  
      const todos = JSON.parse(localStorage.getItem("todos")) || []
      todos.push(todo)
      localStorage.setItem("todos",JSON.stringify(todos))
          
      setTimeout(() => {      
        setIsProcessing(false)
        window.toastify("A new todo has been successfully added","success")
        navigate("/dashboard/todos")
      }, 500);
    }
  return (
     <main className="auth flex-center">
      <div className="container">
        <div className="card p-3 p-4 mx-auto">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <Title level={2} className=" mb-0">Add Todo </Title>
            <Button type="primary" onClick={()=>{navigate("/dashboard/todos")}}>Todos</Button>
          </div>
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <Item label="Title" name="title" required>
                  <Input size="large" type="text" name="title" placeholder="Enter title" onChange={handleChange} />
                </Item>
              </Col>
              <Col span={24}>
                <Item label="Due Date" name="dueDate" >
                  <DatePicker size="large"  name="dueDate" placeholder="Enter due Date" className="w-100" onChange={(obj,dueDate)=>{setState(s=>({...s , dueDate}))}} />
                </Item>
              </Col>
              <Col span={24}>
                <Item label="Description" name="description" >
                  <Input.TextArea  name="description" placeholder="Enter Todo description" onChange={handleChange} style={{height:100 , resize:"none"}} />
                </Item>
              </Col>
             <Col span={24}>
                <Item label="Priority" name="priority">
                  <Select
                    size="large"
                    placeholder="please select todo priority"
                    options={[
                      { value: "low", label: "Low" },
                      { value: "Medium", label: "Medium" },
                      { value: "High", label: "High" },
                    ]}
                    onChange={(priority) => setState(s => ({ ...s, priority }))}
                  />
                </Item>
              </Col>
            
              <Col span={24}>
                <Button type="primary" size="large" block loading={isProcessing} onClick={handleSubmit}>Save Todo</Button>
              </Col>
              </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Add