import { Map} from 'immutable'
import createReducer from '../createReducer'
import TODO from '../types/todo'
import Util from '../../utils'

const initialState = {
  todoList:[{
    "id":"1",
    "title":"1",
    "state":"false",
  },
  {
    "id":"2",
    "title":"2",
    "state":"false",
  },
  {
    "id":"3",
    "title":"3",
    "state":"true",
  },
  {
    "id":"4",
    "title":"4",
    "state":"true",
  }],
}
interface ActionConfig {
  type: string;
  data: {
    msg:string,
    id:string,
  }
}

const actionHandler = {
  [TODO.ADD_TODO]:(state:any, action:ActionConfig) => {
    let itemTemp = {
      "id":Util.randomWord(false,6,6),
      "title":action.data.msg,
      "state":"false",
    }

    //  --扩展运算符 复制数组（浅拷贝）: a2 = [...a1]; 或者 a2 = a1.concat();
    //  --扩展运算符 合并数组（浅拷贝）: [...arr1, ...arr2, ...arr3] 或者 arr1.concat(arr2, arr3);
    //  --扩展运算符 复制对象（浅拷贝）: obj2 = {...obj1}
    //  --扩展运算符 合并对象（浅拷贝）: {...obj1,...obj2}
    return {
      ...state,
      todoList:[itemTemp,...state.todoList],
    }

  },
  [TODO.GET_TODO]:(state:any, action:ActionConfig) => {
    // 此处的state就是全局的state
    // return {...initialState , ...state}
    let itemTemp = {
      "id":Util.randomWord(false,6,6),
      "title":"初始化",
      "state":"false",
    }
    console.log('reducers-1')
    console.log(state)
    return {...state,todoList:[...state.todoList,itemTemp]}
  },
  [TODO.UPDATE_TODO]:(state:any, action:ActionConfig) => {
    let id = action.data.id
    // console.log(id)
    
   
    return {...state,
      todoList: state.todoList.map(item=>{
        if (item.id == id){
          item.state = 'true'
        }
        return item
      }),
    }
  },
  [TODO.DELETE_TODO]:(state:any, action:ActionConfig) => {
    let id = action.data.id
    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
    return {...state,
      todoList: state.todoList.filter(item=>item.id != id),
    }
  },
}

export default createReducer(initialState,actionHandler)
