import { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input,  Row, Select, Typography } from "antd";
import { useNavigate, useParams  } from "react-router-dom";
import dayjs from "dayjs";

const { Title } = Typography;
const {Item} = Form;
const initialState = { title: "", dueDate: "" , description:"" , priority:"" }

const Edit = () => {
  
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
  
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    useEffect(()=>{
     const {id} = params
     const todos = JSON.parse(localStorage.getItem("todos"))||[]
     const todo = todos.find(todo=>todo.id == id)
     setState(todo)
    },[params])

    // console.log('state :>> ', state);
  
    const handleSubmit = () => {
      let {id,title,dueDate,description,priority,status,isCompleted } = state
      title = title.trim()
      if(title.length<3){return window.toastify("Invalid email or password","error")}
      const todo = {title,dueDate,description,priority,status,isCompleted}
      todo.updatedAt = new Date().getTime()
      setIsProcessing(true)
  
      const todos = JSON.parse(localStorage.getItem("todos")) || []
      const updatedTodos = todos.map(item=>{
        if(item.id === id)
          return { ...item , ...todo}
        return item
      })
      localStorage.setItem("todos",JSON.stringify(updatedTodos))
          
      setTimeout(() => {      
        setIsProcessing(false)
        window.toastify("A todo has been updated successfully","success")
        navigate("/dashboard/todos")
      
      }, 500);
    }
  return (
     <main className="auth flex-center">
      <div className="container">
        <div className="card p-3 p-4 mx-auto">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <Title level={2} className=" mb-0">Update Todo </Title>
            <Button type="primary" onClick={()=>{navigate("/dashboard/todos")}}>Todos</Button>
          </div>
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <Item label="Title"  required>
                  <Input size="large" type="text" name="title" value={state.title} placeholder="Enter title" onChange={handleChange} />
                </Item>
              </Col>
              <Col span={24}>
                <Item label="Due Date"  >
                  <DatePicker size="large"  name="dueDate" value={state.dueDate ? dayjs(state.dueDate):null} placeholder="Enter due Date" className="w-100" onChange={(obj,dueDate)=>{setState(s=>({...s , dueDate}))}} />
                  {/* <DatePicker size="large"  name="dueDate" defaultValue={dayjs(state.dueDate)} placeholder="Enter due Date" className="w-100" onChange={(obj,dueDate)=>{setState(s=>({...s , dueDate}))}} /> */}
                </Item>
              </Col>
              <Col span={24}>
                <Item label="Description"  >
                  <Input.TextArea  name="description" value={state.description} placeholder="Enter Todo description" onChange={handleChange} style={{height:100 , resize:"none"}} />
                </Item>
              </Col>
             <Col span={24}>
                <Item label="Priority" >
                  <Select value={state.priority}
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
                <Button type="primary" size="large" block loading={isProcessing} onClick={handleSubmit}>Update Todo</Button>
              </Col>
              </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Edit