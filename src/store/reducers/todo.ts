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
    msg:string;
  }
}

const actionHandler = {
  [TODO.ADD_TODO]:(state:any, action:ActionConfig) => {
    // return {...initialState , ...state}
    let itemTemp = {
      "id":Util.randomWord(false,6,6),
      "title":action.data.msg,
      "state":"false",
    }
    // console.log('-----------------add')
    console.log([...state.todoList,itemTemp])
    
    // state.todoList = [itemTemp,...state.todoList]
    // console.log(state)
    return {
      ...state,
      todoList:[itemTemp,...state.todoList],
    }

  },
  [TODO.GET_TODO]:(state:any, action:ActionConfig) => {
    // 此处的state就是全局的state
    // return {...initialState , ...state}
    console.log('reducers-1')
    console.log(state)
    return state
  },
}

export default createReducer(initialState,actionHandler)
