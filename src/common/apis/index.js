import axios from 'axios'

import AskPost from './AskPost'

const cm = '/zhzx_weixin_server/index.php/api/';
const ol = 'http://wechat.crnonline.cn/index.php/api/';
let host;

if(process.env.NODE_ENV === "production") {
  host = ol;
}else {
  host = cm;
}

// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 500000,
  // withCredentials: true,
  headers: {
    // responseType: 'JSON',
    // 'Content-Type': 'application/json'
  },
  withCredentials:true,
})

// 添加拦截器，处理 公用请求参数，和通用请求头部
ajaxinstance
  .interceptors
  .request
  .use((config) => {
    // TODO
    console.log(config);
    
    return config
  }, (error) => {
    Promise.reject(error)
  })

// 请求响应拦截器
ajaxinstance
  .interceptors
  .response
  .use((response) => {
    // TODO
    if (response.data.code === 3001) {
      //todo 授权
      API.getWechatAuth(window.location.href).then(res=>{
        if (res.code === 200) {
          window.location.href = res.data.url
        }
      },err=>{
        console.log(err);
      });
    }
    return response.data
  }, (error) => {
    return Promise.reject(error)
  })

/**
 * [API api接口封装]
 * @type {Object}
 */
const API = {
  ...AskPost(ajaxinstance),
}

export default API
