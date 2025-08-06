import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:5159/api'
  // baseURL: 'http://46.8.158.181/api'
  baseURL: 'https://proestateplus.ru/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api