import { useEffect, useState } from 'react'
import { Typography , Button, Table , Dropdown } from 'antd'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, MoreOutlined } from '@ant-design/icons'

const {Title , Text} = Typography
const All = () => {

  const [todos , setTodos] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    //  const todos = JSON.parse(localStorage.getItem(todos))||[]
    //  setTodos(todos)
     const todos = JSON.parse(localStorage.getItem("todos"))
     if(todos){ setTodos(todos.map(todo =>({...todo , key:todo.id}))) }
  },[])

  // console.log('todos :>> ', todos);
  const handleDelete = todo =>{
    // console.log('todo :>> ', todo);
    const filteredTodos= todos.filter(item => item.id !== todo.id)
    // console.log('filteredTodos :>> ', filteredTodos);
    setTodos(filteredTodos)
    localStorage.setItem("todos",JSON.stringify(filteredTodos))
    window.toastify("Todo deleted successfully","success")
  }
  const columns = [
  {    title: 'Title', dataIndex: 'title',  },
  {    title: 'Due Date', dataIndex: 'dueDate',  },
  {    title: 'Description', dataIndex: 'description',  },
  {    title: 'Priority', dataIndex: 'priority', render:(text)=><Text className='text-capitalize'>{text}</Text> },
  {    title: 'Date Created', dataIndex: 'createdAt', render:(text)=><Text className='text-capitalize'>{dayjs(text).format(" dddd DD-MMM-YYYY , hh-mm-ss A")}</Text> },
  {
    title: 'Action',
    render: (_, record) => (
      <Dropdown menu={{
        items:[
          // {label:"Edit" , key:"edit" , icon:<EditOutlined />},
          // {label:"Edit" , key:"edit" , icon:<EditFilled />, onClick:()=>{navigate("/dashboard/todos/edit/" + record.id)}},
          {label:"Edit" , key:"edit" , icon:<EditFilled />, onClick:()=>{navigate(`/dashboard/todos/edit/${record.id}`)}},
          // {label:"Delete" , key:"delete" , icon:<DeleteOutlined />},
          {label:"Delete" , key:"delete" , icon:<DeleteFilled  />, onClick:()=>{handleDelete(record)}}
        ]
      }} trigger={['click']}>
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

  return (
    <main className='py-5'>
      <div className='container'>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Title level={2} className=" mb-0">Todos </Title>
        <Button type="primary" onClick={()=>{navigate("/dashboard/todos/add")}}>Add Todo</Button>
      </div>
      <Table columns={columns} dataSource={todos} />
      </div>
    
    </main>
  )
}

export default All