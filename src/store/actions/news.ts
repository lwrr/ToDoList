import NEWS from '../types/news'
import storage from '../../config/storage'
import {GetNewsList, UpdateNewsList} from '../../api/news/list'
import {Actions} from 'react-native-router-flux'
/**
 * 获取首页新闻列表
 * @param msg 查询信息
 * @param 
 * 
 * */
export const GetNewsListAction = (msg:string ='') => async (dispatch:any) => {
  try{
    // 从storage里获取用户id,作为参数传入
    let userInfo:{userId:string} = await storage
      .load({
        key: 'userInfo',
      })
      .then(ret => {
        console.log(ret)
        console.log(ret.userId)
        return ret
      })
      .catch(err => {
        console.warn(err.message)
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break
          case 'ExpiredError':
            // TODO
            break
        }
      })
    // 调用接口获取新闻列表
    console.log("调首页接口")
    console.log(userInfo.userId)
    // 登录信息已过期，跳转到登录页面
    if(!userInfo.userId){
      Actions.Login()
      return
    }
    
    let data = await GetNewsList(userInfo.userId,{"filter[where][content][like]": msg})
    console.log("接口调用成功，已经获取到数据")
    // https://d.apicloud.com/mcm/api/news?[where][content][like]=整改
    console.log(data)
    await dispatch({
      type: NEWS.GET_NEWS_LIST,
      data: data,
    })
    
  }catch(err){

  }
}
/**
 * 获取收藏列表
 * @param 
 * 
 * */
export const GetCollectNewsAction = () => async (dispatch:any) => {
  try{
    // 从storage里获取用户id,作为参数传入
    let userInfo:{userId:string} = await storage
      .load({
        key: 'userInfo',
      })
      .then(ret => {
        console.log(ret)
        console.log(ret.userId)
        return ret
      })
      .catch(err => {
        console.warn(err.message)
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break
          case 'ExpiredError':
            // TODO
            break
        }
      })
    // 调用接口获取新闻列表
    console.log("调收藏列表接口")
    console.log(userInfo.userId)
    // 登录信息已过期，跳转到登录页面
    if(!userInfo.userId){
      Actions.Login()
      return
    }
    
    let data = await GetNewsList(userInfo.userId,{"filter[where][collect]": '1'})
    console.log("收藏列表获取成功，已经获取到数据")
    // https://d.apicloud.com/mcm/api/news?[where][content][like]=整改
    console.log(data)
    await dispatch({
      type: NEWS.GET_COLLECT_LIST,
      data: data,
    })
    
  }catch(err){

  }
}
export const UpdateNewsAction = ({id,collect}) => async (dispatch:any) => {
  try{
    // 调用接口获取新闻列表
    console.log("调收藏接口")
    console.log({id,collect})
    let data = await UpdateNewsList({id,collect})

    console.log("接口调用成功，已经获取到数据")
    console.log(data)
    await dispatch({
      type: NEWS.UPDATE_NEWS_LIST,
      data: data,
    })
  
  }catch(err){

  }
}
