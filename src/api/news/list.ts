

// import {net,urlHandle,headersHandle,netTimeout} from '../net'
import global from '../../config/global'
import config from '../index'
import Util from '../../utils'
import { ToastAndroid } from 'react-native'

/**
 * 查询新闻列表
 * 
 * 
 * */ 
let {log} = console
export function GetNewsList (userId,msg:string='123'):
Promise<any> {

  let params = {"[where][content][like]": msg}
  let headers = {"X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"c1e2cd72c9d69d8f6431aeef3918813fd0dd4aa5.1573136284951"}
  let newUrl = "https://d.apicloud.com/mcm/api/news"
  // let headers = headersHandle()
  // let newUrl = urlHandle('/news') 
  log(1)
  log( headers)
  log( newUrl)
 
  let paramsArray: string[] = []
  Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
  newUrl += '?' + paramsArray.join('&')
  
  // log(paramsArray.join('&'))
  // console.log(newUrl)

  let request = new Promise((resolve,reject) => {
    fetch(`${newUrl}`,{
      // method:'GET',
      headers: headers,
    })
      .then(response => response.json())
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
          '获取成功',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
        // console.log(data)
        // console.log('正确')
       
        resolve(data)
      })
      .catch(err =>{
        console.log('错误')
        console.log(err)
        reject(err)
      })
  })
  return request

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
