import HEADER from '../types/header'
export const AddToDoAction = (msg:string) => async (dispatch:any) => {
  try{
    dispatch({
      type:HEADER.ADD_HEADER_MSG,
      data:msg,
    })
  }catch(err){

  }
}
