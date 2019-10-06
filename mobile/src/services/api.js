import axios from 'axios'

const api = axios.create({
  // esse IP pode mudar!!!
  baseURL: 'http://192.168.15.11:3333'
})

export default api