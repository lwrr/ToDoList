import { Map} from 'immutable'
import createReducer from '../createReducer'
import HEADER from '../types/header'

const initialState = {
  headerInfo:{
    inputMsg:'请输入内容123',
  },
}
interface ActionConfig {
  type: string;
  data: {
    msg:string;
  }
}

const actionHandler = {
  [HEADER.ADD_HEADER_MSG]:(state:any, action:ActionConfig) => {
    // return {...initialState , ...state}
    return initialState
  },
}

export default createReducer(initialState,actionHandler)
