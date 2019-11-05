
// import Toast from 'react-native-root-toast'
import global from '../config/global'
import config from '.'
// import { ToastAndroid } from 'react-native'

interface NetConfig {
  get?(url:string,params?:{[proName:string]:any},option?:{[proName:string]:string | number }):Promise<any> ;
  post(url: string, params?: { [key: string]: string | number }, option?: { [key: string]: string | number }): Promise<any>
}
const net:NetConfig = {
  post (url,params = {},option) {
    let newUrl = urlHandle(url)
    if (!option || !option.noToken) {
      params.token = global.token
      params.app_id = config.appId
      params.from = config.from
    }
    let request = new Promise((resolve,reject) => {
      fetch(newUrl,{
        method:'POST',
        body:JSON.stringify(params),
        // headers: new Headers({
        //   'Content-Type': 'application/json',
        // }),
      })
        .then(response => response.json())
        .then((data) => {
          if(data.Code !== config.successCode && data.Code != config.noDateCode){
            // Toast.show(data.Msg, {
            //   duration: Toast.durations.LONG,
            //   position: Toast.positions.CENTER,
            //   shadow: false,
            // })
            reject(new Error('errCode'))
          }
          resolve(data)
        })
        .catch(err =>{
          // Toast.show('服务器繁忙', {
          //   duration: Toast.durations.SHORT,
          //   position: Toast.positions.CENTER,
          //   shadow: false,
          // })
          reject(err)
        })

    })
    return netTimeout(request)
  },
}

function netTimeout (netPromise: Promise<any>, timeout: number = 15000) {
  let timeoutFn: any
  let timeoutPromise: Promise<any> = new Promise((resolve, reject) => {
    timeoutFn = setTimeout(() => {
      // Toast.show('请求超时', {
      //   duration: Toast.durations.LONG ,
      //   position: Toast.positions.CENTER,
      //   shadow: false,
      // })
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
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url
  } else if (url.startsWith('/')) {
    return config.baseUrl + url.substr(1)
  } else {
    return config.baseUrl + url
  }
}
export default net
