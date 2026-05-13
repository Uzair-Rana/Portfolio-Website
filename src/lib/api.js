import axios from 'axios'

const api = axios.create()

api.interceptors.request.use((config) => {
  return config
})

api.interceptors.response.use((response) => response, (error) => {
  return Promise.reject(error)
})

export function submitContact(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: { ok: true, received: payload } })
    }, 400)
  })
}

export default api
