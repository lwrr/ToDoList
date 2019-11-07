// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux'
import todo from './todo'
import user from './user'
import news from './news'
export default combineReducers({
  todo,
  user,
  news,
})
