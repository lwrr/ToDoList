import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Component from '../../Component'
import AddInput from '../../components/Header'
// import ToDo from './src/scene/ToDo'
import ToDoList from './Base/ItemList'

interface Props {
}
export default class  extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <AddInput></AddInput>
        <ToDoList></ToDoList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
})
