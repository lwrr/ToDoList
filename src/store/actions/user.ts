import USER from '../types/user'
import { Login,GetUserInfo,UpdateUserInfo,AddUserInfo} from '../../api/member/user'
import storage from '../../config/storage'


export const LoginAction = ({account,password}:{account:string,password:string}) => async (dispatch:any)=> {
  try{
    // console.log({account,password})
    let data = await Login({account,password})
    console.log('得到数据')
    console.log(data)
    await storage.save({
      key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
      data: {
        from: 'demo_app',
        userId:data.userId,
        token: data.id,
      },
      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      // expires: 1000 * 3600,
    })
    await dispatch(GetUserInfoAction(data.userId,data.id))
    return Promise.resolve()
  } catch(err){
    // 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行，然后执行到catch中；
    return Promise.reject(err)
  }
}

export const GetUserInfoAction = (userId,token) => async (dispatch: any) => {
  try {
    console.log("获取用户信息")
    let data = await GetUserInfo(userId,token)
    dispatch({
      type: USER.GET_USER_INFO,
      data: data,
    })
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const UpdateUserInfoAction = (userId,token,param:{username?:string,password?:string}) => async (dispatch: any) => {
  try {
    console.log("修改账号密码")
    let data = await UpdateUserInfo(userId,token,param)
    dispatch({
      type: USER.GET_USER_INFO,
      data: data,
    })
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const AddUserInfoAction = (param:{username:string,password:string}) => async (dispatch: any) => {
  try {
    console.log("新增用户")
    let data = await AddUserInfo(param)
    console.log(data)
    dispatch({
      type: USER.GET_USER_INFO,
      data: data,
    })
    return Promise.resolve()
    
  } catch (error) {
    console.log('err------------------')

    return Promise.reject(error)
  }
}
