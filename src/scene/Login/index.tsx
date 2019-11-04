import React from 'react'
import {View,Text,TextInput,StyleSheet,TouchableHighlight ,ScrollView,Image,PixelRatio,Dimensions} from 'react-native'
import Component from '../../Component'
import { connect } from 'react-redux'
import CommonStyle from '../../style'
interface Props{}

class Login extends Component<Props>{
  componentDidMount= () => {
    const {height, width} = Dimensions.get('window');
    console.log(height,width)
  }
 render(){
   return(
     
      <View style={styles.container}>
      <View style={styles.inputWrap}>
       <TextInput style={styles.inputAcc} placeholder="账号"></TextInput>
       <TextInput style={styles.inputAcc} placeholder="密码"></TextInput>
       <Text style={[styles.inputAcc,styles.err]} >账号输入错误</Text>
      </View>
      <View style={[styles.submitWrap]}><TouchableHighlight><Text  style={styles.submitBtn}>登 录</Text></TouchableHighlight></View>
    </View>
   
   )
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
    marginVertical:6,
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
    flex:1,
    height:30,
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
    fontWeight:'bold'
  }
})

export default connect((state)=>({}),{})(Login)
