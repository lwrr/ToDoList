// import Immutable,{ Map} from 'immutable'
import createReducer from '../createReducer'
import USER from '../types/user'

interface StateConfig {
  [proName: string]:any,
}
const initialState ={
  userInfo:{},
}

interface ActionConfig {
  type: string;
  data:object
}
const actionHandler = {
  [USER.GET_USER_INFO]:(state:StateConfig,action:ActionConfig) => {
    console.log("用户reduces")
    console.log(action.data)
    return {...state, userInfo:action.data}
  },
}
export default createReducer(initialState,actionHandler)

