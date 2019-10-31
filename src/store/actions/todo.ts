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
export const UpdateToDoAction = (id:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.UPDATE_TODO,
      data:id,
    })
  }catch(err){

  }
}
export const DeleteToDoAction = (id:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:TODO.DELETE_TODO,
      data:id,
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
