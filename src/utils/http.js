import axios from 'axios'
import router from '@/router'
import vue from 'vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.response.use(
  response => {
    if (response.status === 200 && [0].includes(response.data.code)) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          vue.toasted.show('未登录')
          router.replace({ path: '/login' })
          break
        default:
          vue.toasted.show(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)

export default service
