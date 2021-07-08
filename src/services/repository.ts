import axios from 'axios'

const baseURL = 'https://api.github.com/'
const headers = {
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json; charset=utf-8'
}

const instance = axios.create({
  baseURL,
  headers
})
instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
export default instance
