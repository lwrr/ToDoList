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


import AddInput from './src/components/Header'
import ToDo from './src/scene/ToDo'
import { Provider} from 'react-redux'
import store from './src/store'

export default class HelloWorldApp extends Component{

  state = {
 
  }
  getInputMag = () => {

  }
  render (){
    return (
      <Provider store = {store}>
        <AddInput></AddInput>
        <ToDo></ToDo>
      </Provider>
    )
  }
}
