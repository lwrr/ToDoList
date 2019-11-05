// import Immutable,{ Map} from 'immutable'
import createReducer from '../createReducer'
import USER from '../types/user'

interface StateConfig {
  [proName: string]:any,
}
const initialState ={}

interface ActionConfig {
  type: string;
  data:object
}
const actionHandler = {
  [USER.GET_USER_INFO]:(state:StateConfig,action:ActionConfig) => {
    return {...state, ...action.data}
  },
}
export default createReducer(initialState,actionHandler)

