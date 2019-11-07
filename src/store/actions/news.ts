import NEWS from '../types/news'
import storage from '../../config/storage'
import {GetNewsList, SearchNews} from '../../api/news/list'

export const GetNewsListAction = (msg:string) => async (dispatch:any) => {
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
    
    let data = await GetNewsList(userInfo.userId)
    console.log("接口调用成功，已经获取到数据")

    console.log(data)
    await dispatch({
      type: NEWS.GET_NEWS_LIST,
      data: data,
    })
    
  }catch(err){

  }
}
export const SearchNewsAction = (id:string) => async (dispatch:any) => {
  try{
    // 调用接口查询新闻列表
    dispatch({
      type:NEWS.SEARCH_NEWS,
      data:id,
    })
  }catch(err){

  }
}
