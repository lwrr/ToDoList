import USER from '../types/user'
import { Login} from '../../api/member/user'

export const LoginAction = ({account,password}:{account:string,password:string}) => async (dispatch:any)=> {
  try{
    let data = await Login({account,password})
    if(data.Data.Type === 1){
      return Promise.resolve(data.Data.Uid)
    }else{
      // await AsyncStorage.setItem('uid', data.Data.Uid)
      dispatch({
        type: USER.GET_USER_INFO,
        data: data.Data,
      })
      return Promise.resolve()
    }
  } catch(err){
    return Promise.reject(err)
  }
}
