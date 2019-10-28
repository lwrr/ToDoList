/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  SectionList,
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import Item from './Base/Item'
import { statement } from '@babel/template'
// const REQUEST_URL =  "./src/utils/MoviesExample.json"
import {connect} from 'react-redux'
import {AddToDoAction, UpdateToDoAction,DeleteToDoAction,GetToDoAction} from '../../store/actions/todo'
interface Props{
  AddToDoAction:any,
  GetToDoAction:any,
  todoList:[],
}

class ToDo extends Component<Props>{

  state = {
    data: [],  //这里放你自己定义的state变量及初始值
    // sections:[
    //   { key: "正在进行", data: [{ id:1,state:'false',title: "阿童木" }, {id:1,state:'false', title: "阿玛尼" }, { id:1,state:'false',title: "爱多多" }] },
    //   { key: "已经完成", data: [{id:1,state:'true', title: "成吉思汗" }, { id:1,state:'true',title: "超市快递" }] }
    // ]
  }

  componentDidMount () {
    this.fetchData()
    console.log(1)
    

  }
  fetchData () {
    this.props.GetToDoAction()
    // this.setState({
    //   data: this.state.data.concat([
    //   {
    //     "id":"3",
    //     "title":"3",
    //     "state":"true",
    //   },
    //   {
    //     "id":"4",
    //     "title":"4",
    //     "state":"true",
    //   }
    // ]),
      
    // })
    // fetch(REQUEST_URL)
    //   .then((response) => {
    //     console.log(response.json())
    //     return response.json()
    //   })
    //   .then((responseData) => {
    //     // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
    //     this.setState({
    //       data: responseData.data,
    //     });
    //   });
  }
 
  // getInputMsg = (result, msg) => {
  //   console.log(msg)
  //   // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数

  //   let itemTemp = {
  //     "id":Util.randomWord(false,6,6),
  //     "title":msg,
  //     "state":"false"
  //   }
  //   this.setState({
  //     data: [itemTemp,...this.state.data]
  //   })
  // };

  delItem = (result,id)=>{
    this.setState({
      data: this.state.data.filter((item)=>{
        return item.id != id
       
      })
    })
  }
  finishItem = (result,id)=>{
    // 查找id相等的

    let itemTemp = this.state.data.find((val)=>val.id == id)
    itemTemp.state = 'true'
   
    this.setState({
      data: this.state.data.map((item)=>{
        if(item.id == id)return itemTemp
        else return item
       
      }),
    })
    // alert(JSON.stringify(this.state))
  }
  renderMovie =({ item,index,separators }) => {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    console.log(2)
    
    if(item.state || item.state == 'false'){
      return (
        <View >
          <Item parent={this}  id={item.id} title={item.title} state={item.state}></Item>
        </View>
      )
    }else if(item.state || item.state == 'true'){
      return (
        <View >
          <Item parent={this}  id={item.id} title={item.title} state={item.state}></Item>
        </View>
      )
    }
   
  }
  //   _sectionComp = (info) => {
  //     var txt = info.section.key;
  //     return <Text
  //       style={{ height: 40, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: '#fff', fontSize: 20 }}>{txt}</Text>
  //   }
  //   _renderItem = ({item}) => {
  //     return (
  //          <Item parent={this}  id={item.id} title={item.title} state={item.state}></Item>
  //     );
  //   }

  render (){
    
    return (
      <>
        {/* <SectionList
            renderSectionHeader={this._sectionComp}
            renderItem={this._renderItem}
            sections={this.state.sections}
            ItemSeparatorComponent={() => <View><Text></Text></View>}
          /> */}
        <FlatList
          data={this.props.todoList}
          renderItem={this.renderMovie}
          style={styles.list}
          keyExtractor={item => item.id}
        />
      </>
    )
  }
}
const styles = StyleSheet.create({
 
  list: {
    // paddingTop: 20,
    // backgroundColor: '#F5FCFF',
    height:"auto",
  },
})

export default connect((state)=>{
  console.log(state)
  return {todoList:state.todoList}
  
},{
  AddToDoAction, UpdateToDoAction,DeleteToDoAction,GetToDoAction,
})(ToDo)
