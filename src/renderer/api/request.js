import axios from 'axios'

const service = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://localhost:44966/api/v1/',
  timeout: 300000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
