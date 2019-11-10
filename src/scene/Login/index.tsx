import React from 'react'
import {View,Text,TextInput,StyleSheet,TouchableHighlight ,ScrollView,Image,PixelRatio,Dimensions} from 'react-native'
import Component from '../../Component'
import { connect } from 'react-redux'
import {color as CommonStyle } from '../../style'
import {Actions} from 'react-native-router-flux'
import {LoginAction,AddUserInfoAction} from '../../store/actions/user'
import IconToast from '../../components/IconToast'

interface Props{
  LoginAction:({account,password}:{account:string,password:string}) => Promise<void|[]>,
  AddUserInfoAction:any
  // [propName:string]:any,
}

class Login extends Component<Props>{
  state={
    account :'',
    password:'',
    error:'',
    loading: false,

  }
  componentDidMount= () => {
    const {height, width} = Dimensions.get('window')
    console.log(height,width)
    this.setState({
      loading: false,
    })
  }
  render (){
    return(
      <View style={styles.container}>
        <IconToast type='loading' title='登录中' visible={this.state.loading}></IconToast>
        <View style={styles.inputWrap}>
          <TextInput style={styles.inputAcc} placeholder='账号' onChangeText={(account)=>{this.setState({account})}}></TextInput>
          <TextInput style={styles.inputAcc} placeholder='密码' onChangeText={(password)=>{this.setState({password})}}></TextInput>
          <Text style={[styles.inputAcc,styles.err]} >{this.state.error}</Text>
        </View>
        <View style={[styles.submitWrap]}><TouchableHighlight onPress={this.submit} ><Text  style={styles.submitBtn}>登 录</Text></TouchableHighlight></View>
      </View>
    )
  }

  submit = async () => {
    if (!this.state.account) {
      this.setState({
        error: '请输入手机号或账号',
      })
      return
    }
    if (!this.state.password) {
      this.setState({
        error: '请输入密码',
      })
      return
    }
    // this.setState({
    //   error: '',
    //   loading: true,
    // })
    try{
      // console.log({account:this.state.account,password:this.state.password})
      
      let data = await this.props.AddUserInfoAction({username:this.state.account,password:this.state.password})
      // let data = await this.props.LoginAction({account:this.state.account,password:this.state.password})
      Actions.pop()
    }catch(err){
      console.log('错误-------')
    }
    this.setState({
      loading: false,
    })
  }

}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    display:'flex',
    flexDirection:'column',
    flex:1,
    padding:15,
    fontSize:CommonStyle.fontSizeM,
    
    
  },
  inputWrap:{
    flexDirection:'column',
    marginTop:100,
    marginBottom:50,
    paddingHorizontal:50,
    alignItems:'flex-start',
    
  },
  inputAcc:{
    height:30,
    lineHeight:30,
    padding:0,
    marginVertical:20,
    width:'100%',
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:CommonStyle.ColorDark,
    fontSize:CommonStyle.fontSizeM,
  },
  err:{
    borderBottomWidth:0,
    color:CommonStyle.ColorRed,
    fontSize:CommonStyle.fontSizeS,
  },
  submitWrap:{
    flexDirection:'row',
   
    height:40,
    justifyContent:'center',
  },
  submitBtn:{
    width:300,
    height:40,
    borderRadius:20,
    backgroundColor:CommonStyle.BgBlue,
    color:CommonStyle.ColorWhite,
    textAlign:'center',
    fontSize:CommonStyle.fontSizeL,
    lineHeight:40,
    fontWeight:'bold',
  },
})

export default connect((state)=>({}),{LoginAction,AddUserInfoAction})(Login)
