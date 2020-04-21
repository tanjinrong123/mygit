import axios from 'axios'
import router from '../router'
import ElementUI from 'element-ui'
// 添加请求拦截器
// let axios = $axios.create({
//   headers: {'Content-Type': 'application/json; charset=utf-8'},
//   baseURL: 'http://118.89.112.142/report'
// })
axios.defaults.baseURL = 'http://localhost:5000/api/' // 本地
// axios.defaults.baseURL = 'http://118.89.112.142:8090/report' // 测试
// axios.defaults.baseURL = 'http://report.orchidland.cn/report'
// axios.defaults.baseURL = 'http://newreport.orchidland.cn/report'
axios.defaults.timeout = 60000
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么k
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  // this.$message.info('fgdk')
  // 对响应数据做点什么
  // if (response.status === 404) {
  //   this.$message.error(response.data.message)
  //   this.$router.replace({
  //     path: '/login',
  //     query: {
  //       redirect: router.currentRoute.fullPath
  //     }
  //   })
  // } else if (response.status === 500) {
  //   this.$router.reject()
  // }
  // 错误码(0调用成功时返回码;100x:调用成功但有其他说明,如无数据等;200x:错误码)
  return response
}, function (error) {
  // 对响应错误做点什么
  switch (error.response.status) {
    case 404:
      ElementUI.Message.error('接口不存在！')
      break
    case 401:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      localStorage.clear()
      break
    case 504:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      localStorage.clear()
      break
    case 500:
      ElementUI.Message.error('获取数据发生错误！')
      break
    default:
  }

  return Promise.reject(error)
})

export default axios
