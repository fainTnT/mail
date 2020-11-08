import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6'
  })
  // axios 拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  },err => {
  })
  return instance(config)
}
