import {applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const createStoreThunk = applyMiddleware(thunk)(createStore)
const store = createStoreThunk(reducers)
export default store
