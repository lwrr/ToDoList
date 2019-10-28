import TODO from '../types/todo'
export const AddToDoAction = (msg:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.ADD_TODO,
      data:msg,
    })
  }catch(err){

  }
}
export const UpdateToDoAction = (msg:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.ADD_TODO,
      data:msg,
    })
  }catch(err){

  }
}
export const DeleteToDoAction = (msg:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.ADD_TODO,
      data:msg,
    })
  }catch(err){

  }
}
export const GetToDoAction = () => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.GET_TODO,
      data:'',
    })
  }catch(err){

  }
}
