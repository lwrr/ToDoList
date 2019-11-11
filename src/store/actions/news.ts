import NEWS from '../types/news'
import storage from '../../config/storage'
import {GetNewsList,GetCollectList, UpdateNewsList,GetNewsCount} from '../../api/news/list'
import {Actions} from 'react-native-router-flux'
/**
 * 获取首页新闻列表
 * @param msg 查询信息
 * @param 
 * 
 * */
export const GetNewsListAction = (msg:string ='',pageSize=10 ,currPage=1) => async (dispatch:any) => {
  try{
    let data = await GetNewsList('',{"filter[where][content][like]": msg,'filter[limit]':pageSize,'filter[skip]':(currPage-1)*10})

    console.log("接口调用成功，已经获取到数据")
    // https://d.apicloud.com/mcm/api/news?[where][content][like]=整改
    console.log(data)
    
    await dispatch({
      type: NEWS.GET_NEWS_LIST,
      data: {data,currPage},
    })
    
    return data
  }catch(err){

  }
}
/**
 * 获取news count
 * @param msg 查询信息
 * @param 
 * 
 * */
export const GetNewsCountAction = (msg:string ='',collect:string='') => async (dispatch:any) => {
  try{
    let count 
    if(!collect){
      count = await GetNewsCount({"filter[where][content][like]": msg})
    }else{
      count = await GetNewsCount({"filter[where][content][like]": msg,"filter[where][collect][like]": collect})

    }
    
    return count
  }catch(err){

  }
}
/**
 * 获取收藏列表
 * @param 
 * 
 * */
export const GetCollectNewsAction = (userId,pageSize=10 ,currPage=1) => async (dispatch:any) => {
  try{
   
    
    let data = await GetCollectList(userId,{"filter[where][collect][like]": '1','filter[limit]':pageSize,'filter[skip]':(currPage-1)*10})
    console.log("收藏列表获取成功，已经获取到数据")
    console.log(data)
    await dispatch({
      type: NEWS.GET_COLLECT_LIST,
      data: {data,currPage},
    })
    
  }catch(err){

  }
}
/**
 * 修改收藏状态
 * @param 
 * 
 * */
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
      data: {data},
    })
  
  }catch(err){

  }
}
