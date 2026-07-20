import { message } from "antd"

window.getRandomId = () => Math.random().toString(36).slice(2)+ Math.random().toString(36).slice(2)
window.isValidEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
window.toastify = (msg,type) =>message[type](msg) 

// let emailFromat =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;