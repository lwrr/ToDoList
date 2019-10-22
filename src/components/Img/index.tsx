import React,{Component} from 'react'
import { View ,Text,ActivityIndicator,StyleSheet,Image} from 'react-native'
interface Props {
  
}
// jsx中{}表示括号内部是js代码，需要执行后取值；
export default class Banner extends Component{
  render(){
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}
      return (
        <Image style={{width:200,height:200}} source={pic}></Image>
      )
  }
}