// import {net,urlHandle,headersHandle,netTimeout} from '../net'
import { ToastAndroid } from 'react-native'
import config from '../index'
import Util from '../../utils'

/**
 * 登录
 * @param account 账号/手机号
 * @param password 密码 
 * 
 * */ 
export function Login ({account,password}:{account:string,password:string}):
Promise<any> {
  // console.log(1)
  // console.log({account,password})
  // return net.post('user/login',{
  //   act:'Login',
  //   username:account,
  //   password:password,
  // })

  // let newUrl = urlHandle('user/login')
  // let headers = Object.create(headersHandle()) 
  // let params = Object.create({
  //   act:'Login',
  //   username:account,
  //   password:,
  // })
 
  let params = {"act": "Login",
    "app_id": "A6002514960727",
    "from": "demo_app",
    "password": password,
    "token": "",
    "username": account}
  let headers = {"Content-Type":"application/json","X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"6e835b3346b4b3d2f774625327b673cbe0703a10.1573103401686"}
  let newUrl = "https://d.apicloud.com/mcm/api/user/login"
  console.log(newUrl,headers,params)
  let request = new Promise((resolve,reject) => {
    fetch(newUrl,{
      method:'POST',
      body:JSON.stringify(params),
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
          return reject(data.error)
        }
        // 如何存储token的值到global.ts里面
        // ToastAndroid.showWithGravity(
        //   '登录成功',
        //   ToastAndroid.SHORT,
        //   ToastAndroid.CENTER
        // )
        console.log('正确11111')
        return resolve(data)
      })
      .catch(err =>{
        console.log('错误')
        console.log(err)
        return reject(err)
      })
  })
  return request

}
/**
 * 获取用户信息
 * @param 
 * @param 
 * 
 * */ 
export function GetUserInfo (userId,token):
Promise<any> {
  console.log(1)
  console.log(userId,token)
 
  let params = {}
  let headers = {"Content-Type":"application/json","X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"6e835b3346b4b3d2f774625327b673cbe0703a10.1573103401686","authorization":token}
  let newUrl = "https://d.apicloud.com/mcm/api/user/"+userId
  console.log(newUrl,headers,params)
  let request = new Promise((resolve,reject) => {
    fetch(newUrl,{
      method:'PUT',
      headers,
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
        console.log('正确')
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
/**
 * 修改用户信息
 * @param 
 * @param 
 * 
 * */ 
export function UpdateUserInfo (userId,token,params)
  :Promise<any> {
  console.log(1)
  console.log(userId,token)
  
  // let headers = {"Content-Type":"application/json","X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"6e835b3346b4b3d2f774625327b673cbe0703a10.1573103401686","authorization":token}
  let headers = headersHandle()
  headers["authorization"] = token
  let newUrl = "https://d.apicloud.com/mcm/api/user/"+userId
  // console.log(newUrl,headers,params)
  let request = new Promise((resolve,reject) => {
    fetch(newUrl,{
      method:'PUT',
      body:JSON.stringify(params),
      headers,
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
        console.log('正确')
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
/**
 * 新增用户
 * @param 
 * @param 
 * 
 * */ 
export function AddUserInfo (params:{username:string,password:string})
  :Promise<any> {
  
  // let headers = {"Content-Type":"application/json","X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"6e835b3346b4b3d2f774625327b673cbe0703a10.1573103401686","authorization":token}
  let headers = headersHandle()
  let newUrl = "https://d.apicloud.com/mcm/api/user"
  let request = new Promise((resolve,reject) => {
    fetch(newUrl,{
      method:'POST',
      body:JSON.stringify(params),
      headers,
    })
      .then(response => response.json())
      .then((data) => {
        if(data.error){
          // ToastAndroid.showWithGravity(
          //   data.error.message,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER
          // )
          console.log('add user err----------------------')
          if(data.error.status == 202){
            // 执行登录
            return resolve(Login({account:params.username,password:params.password}))
             
          }else{
            ToastAndroid.showWithGravity(
              data.error.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            )
            return reject(data.error)
          }
         
          
        }
          
        // 执行登录
        console.log('add user ok---------------------')
        Login({account:params.username,password:params.password})
        
        return resolve(data)
      })
      .catch(err =>{
        console.log('错误')
        console.log(err)
        reject(err)
      })
  })
  return request  
}
function headersHandle () {
  const now = Date.now()
  const appKey = Util.SHA1(config.appId+"UZ"+config.appKey+"UZ"+now)+"."+now
  // let ret  = Object.create({})
  // ret["X-APICloud-AppKey"] = appKey
  return {
    "X-APICloud-AppKey":appKey,
    "X-APICloud-AppId":config.appId,
    "Content-Type": 'application/json',   
  }
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