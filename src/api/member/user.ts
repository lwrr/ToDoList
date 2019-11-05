import net from '../net'
/**
 * 登录
 * @param account 账号/手机号
 * @param password 密码 
 * 
 * */ 
export function Login ({account,password}:{account:string,password:string}):
Promise<any> {
  return net.post('/member/Ajax?login',{
    act:'Login',
    account:account,
    password:password,
  })
}
