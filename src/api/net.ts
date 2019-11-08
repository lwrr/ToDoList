
// import Toast from 'react-native-root-toast'
import global from '../config/global'
import config from '.'
import Util from '../utils'
import { ToastAndroid } from 'react-native'

interface NetConfig {
  get?(url:string,params?:{[proName:string]:any},option?:{[proName:string]:string | number }):Promise<any> ;
  post(url: string, params?: { [key: string]: string | number }, option?: { [key: string]: string | number }): Promise<any>
}
const net:{
  get(url: string, params?: { [key: string]: string | number }, option?: { [key: string]: string | number }): Promise<any>;
  post(url: string, params?: { [key: string]: any }, option?: { [key: string]: any }): Promise<any>;
}  = {
  get (url, params = {}, option) {
    let newUrl = urlHandle(url)
    if (!option || !option.noToken) {
      params.token = global.token
      params.app_id = config.appId
      params.from = config.from
    }
    let paramsArray: string[] = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    newUrl += '?' + paramsArray.join('&')
    let request = new Promise((resolve, reject) => {
      fetch(newUrl)
        .then((response) => response.json())
        .then((data) => {
          if(data.error){
            ToastAndroid.showWithGravity(
              data.error.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            )
            reject(data.error)
          }
          // 如何存储token的值到global.ts里面
          ToastAndroid.showWithGravity(
            '登录成功',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
          resolve(data)
        })
        .catch((err) => {
          // Toast.show('服务器繁忙', {
          //   duration: Toast.durations.LONG,
          //   position: Toast.positions.CENTER,
          //   shadow: false,
          // })
          reject(err)
        })
    })
    return netTimeout(request)
  },
  async post (url,params = {},option) {
    let newUrl = urlHandle(url)
    let headers = headersHandle()
    if (!option || !option.noToken) {
      params.token = global.token
      params.app_id = config.appId
      params.from = config.from
    }
    console.log('post')
    console.log(newUrl,params,headers)

    let request = new Promise((resolve,reject) => {
      fetch(newUrl,{
        method:'POST',
        body:JSON.stringify(params),
        headers,
      })
        .then(response =>{
          console.log('结果页')
          console.log(response.json())
          return  response.json()
        })
        .then((data) => {
         
          if(data.error){
            ToastAndroid.showWithGravity(
              data.error.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            )
            reject(data.error)
          }
          // 如何存储token的值到global.ts里面
          ToastAndroid.showWithGravity(
            '登录成功',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          )
          resolve(data)
          // if(data.Code !== config.successCode && data.Code != config.noDateCode){
          //   // Toast.show(data.Msg, {
          //   //   duration: Toast.durations.LONG,
          //   //   position: Toast.positions.CENTER,
          //   //   shadow: false,
          //   // })
          //   reject(new Error('errCode'))
          
        })
        .catch(err =>{
          // Toast.show('服务器繁忙', {
          //   duration: Toast.durations.SHORT,
          //   position: Toast.positions.CENTER,
          //   shadow: false,
          // })
          console.log('接口报错了')
          console.log(err)
          reject(err)
        })

    })
    // return request
    return netTimeout(request)
  },
}

function netTimeout (netPromise: Promise<any>, timeout: number = 15000) {
  let timeoutFn: any
  let timeoutPromise: Promise<any> = new Promise((resolve, reject) => {
    timeoutFn = setTimeout(() => {
      ToastAndroid.showWithGravity(
        '请求超时',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      reject(new Error('timeout promise'))
    }, timeout)
  })
  let abortablePromise: Promise<any> = Promise.race([
    netPromise.then((data) => {
      clearTimeout(timeoutFn)
      return Promise.resolve(data)
    }).catch((error) => {
      clearTimeout(timeoutFn)
      return Promise.reject(error)
    }),
    timeoutPromise,
  ])
  return abortablePromise
}

function urlHandle (url: string) {
  // return 'http://192.168.20.16:5500/login.json'
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url
  } else if (url.startsWith('/')) {
    return config.baseUrl + url.substr(1)
  } else {
    return config.baseUrl + url
  }
}
function headersHandle () {
  const now = Date.now()
  const appKey = Util.SHA1(config.appId+"UZ"+config.appKey+"UZ"+now)+"."+now
  return {
    "X-APICloud-AppKey":appKey,
    "X-APICloud-AppId":config.appId,
    "Content-Type": 'application/json',   
  }
}
export {net,urlHandle,headersHandle,netTimeout}
