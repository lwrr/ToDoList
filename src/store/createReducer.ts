interface HandlesConfig {
  [propName: string]: any;
}
interface ActionConfig {
  type: string;
  [propName: string]: any;
}
function createReducer<T> (initialState: T,handlers: HandlesConfig){
  return function reducer (state:T = initialState,action: ActionConfig):T {
    if (handlers.hasOwnProperty(action.type)){
      return handlers[action.type](state,action)
    }
  }

}
export default createReducer
