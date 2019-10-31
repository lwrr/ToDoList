import React,{Component} from 'react'
import { View ,Text,ActivityIndicator,StyleSheet,
  Button ,TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import { UpdateToDoAction,DeleteToDoAction} from '../../../store/actions/todo'
interface Props {
  UpdateToDoAction:any,
  DeleteToDoAction:any,
  todo:any,
}


class Item extends Component<Props>{
  state = {
    checked:true,
  }
  render (){
    return (
      <View style={this.props.todo.state=='true'?[styles.container,styles.finish]:[styles.container]}>
        <View ><TouchableHighlight onPress={this.selectItem} ><Text> 勾选</Text></TouchableHighlight></View>
        <Text style={styles.content}> {this.props.todo.title}</Text>
        <View ><Button onPress={this.delItem} title='删除'></Button></View>
      </View>
    )
  }
 
  delItem = ()=>{
    // alerstatet(this.props.id)
    this.props.DeleteToDoAction({id:this.props.todo.id})
  }
  finishItem = ()=>{
    // alert('finish')
    // console.log(this.props.todo.id)
    
    this.props.UpdateToDoAction({id:this.props.todo.id})
  }
  selectItem = () =>{
    let state = this.props.todo.state
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
    borderRadius:6,
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

export default connect(null,{ UpdateToDoAction,DeleteToDoAction})(Item)
