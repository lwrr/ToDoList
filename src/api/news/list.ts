
import { ToastAndroid } from 'react-native'
/**
 * 查询新闻列表
 * 
 * 
 * */ 
export function GetNewsList (userId):
Promise<any> {
  let params = {"app_id": "A6002514960727"}
  let headers = {"X-APICloud-AppId":"A6002514960727","X-APICloud-AppKey":"6e835b3346b4b3d2f774625327b673cbe0703a10.1573103401686"}
  let newUrl = "https://d.apicloud.com/mcm/api/news"
 
  let paramsArray: string[] = []
  Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
  newUrl += '?' + paramsArray.join('&')
  console.log(1)
  console.log(newUrl)

  let request = new Promise((resolve,reject) => {
    fetch(newUrl,{
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
