import USER from '../types/user'
import { Login} from '../../api/member/user'
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
      expires: 1000 * 3600,
    })
    //   // await AsyncStorage.setItem('uid', data.Data.Uid)

    await dispatch({
      type: USER.GET_USER_INFO,
      data: data,
    })
    return Promise.resolve()
    // if(data.Data.Type === 1){
    //   return Promise.resolve(data.Data.Uid)
    // }else{
    //   // await AsyncStorage.setItem('uid', data.Data.Uid)
    //   dispatch({
    //     type: USER.GET_USER_INFO,
    //     data: data.Data,
    //   })
    //   return Promise.resolve()
    // }
  } catch(err){
    // 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行，然后执行到catch中；
    return Promise.reject(err)
  }
}
