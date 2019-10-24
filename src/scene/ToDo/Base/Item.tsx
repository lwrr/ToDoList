import React,{Component} from 'react'
import { View ,Text,ActivityIndicator,StyleSheet,
  Button ,TouchableHighlight} from 'react-native'
interface Props {
  id:string;
  title:string;
  state:string;
  parent?:any;
  
}


export default  class Item extends Component<Props>{
  state = {
    checked:true,
  }
  render (){
    return (
      <View style={this.props.state=='true'?[styles.container,styles.finish]:[styles.container]}>
        <View ><TouchableHighlight onPress={this.selectItem} ><Text> 勾选</Text></TouchableHighlight></View>
        <Text style={styles.content}> {this.props.title}</Text>
        <View ><Button onPress={this.delItem} title='删除'></Button></View>
      </View>
    )
  }
 
  delItem = ()=>{
    // alerstatet(this.props.id)
    this.props.parent.delItem(this,this.props.id)
  }
  finishItem = ()=>{
    // alert('finish')
    
    this.props.parent.finishItem(this,this.props.id)
  }
  selectItem = () =>{
    let state = this.props.state
    if(state == 'false'){
      //  设置为已完成
      this.finishItem()

    }else if(state == 'true'){
      // 删除
      this.delItem()
    }
  }
}

const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:'#ccc',
    height:40,
    margin:15,
    marginTop:5,
    marginBottom:0,
    padding:10,
    borderRadius:6
    
  },
  finish:{
    opacity:0.4,
  },
  content:{
    flex:1,
    textAlign:'center',
    // backgroundColor:"#999",
  },
})
