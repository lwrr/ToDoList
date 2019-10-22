/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  SectionList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import AddInput from './src/components/Header'
import ToDo from './src/scene/ToDo'

export default class HelloWorldApp extends Component{

  state = {
 
  };
  componentDidMount() {

  }
  getInputMsg = (result, msg) => {
    console.log(msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数

    let itemTemp = {
      "id":Util.randomWord(false,6,6),
      "title":msg,
      "state":"false"
    }
    this.setState({
      data: [itemTemp,...this.state.data]
    })
  };

  render(){
    
    return (
      <>
      <AddInput getInputMag={ this }></AddInput>
      <ToDo></ToDo>
      </>
    )
  }
}
const styles = StyleSheet.create({
 
  list: {
    // paddingTop: 20,
    // backgroundColor: '#F5FCFF',
    height:"auto"
  },
})