import Immutable,{ Map} from 'immutable'
import createReducer from '../createReducer'
import NEWS from '../types/news'
import Util from '../../utils'

const initialState ={
  newsList:[],
  collectList:[],
}
interface ActionConfig {
  type: string;
  data: {data:any,currPage:number}
}

const actionHandler = {
  [NEWS.GET_NEWS_LIST]:(state:any, action:ActionConfig) => {
    // ---------------不使用immutable的写法
    console.log('reducers 接收数据')
    console.log(action.data)
    
    if(action.data.currPage == 1){
      return {
        ...state,
        newsList:action.data.data,
      }
    }else{
      return {
        ...state,
        newsList:[...state.newsList,...action.data.data],
      }
    }
   
    // ---------------使用immutable的写法
    // let itemTemp = Map({
    //   "id":Util.randomWord(false,6,6),
    //   "title":action.data.msg,
    //   "state":"false",
    // })
    // return state.updateIn(['todoList'],value=>value.unshift(itemTemp)) 
  },
  [NEWS.GET_COLLECT_LIST]:(state:any, action:ActionConfig) => {
    console.log('reducers collect 接收数据')
    console.log(action.data)
    
    if(action.data.currPage == 1){
      return {
        ...state,
        collectList:action.data.data,
      }
    }else{
      return {
        ...state,
        collectList:[...state.collectList,...action.data.data],
      }
    }
  },
  [NEWS.UPDATE_NEWS_LIST]:(state:any,action:ActionConfig) =>{
    // 修改是否收藏
    console.log(action.data)
    return {
      ...state,
      newsList:state.newsList.map(item=>{
        if(item.id == action.data.data.id){
          return action.data.data
        }else{
          return item
        }
      }),
      collectList:state.collectList.map(item=>{
        if(item.id == action.data.data.id){
          return action.data.data
        }else{
          return item
        }
      }),
    }
  },
}

export default createReducer(initialState,actionHandler)
