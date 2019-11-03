import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Component from '../../Component'

interface Props {
}
export default class My extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Text>我的</Text>
        <Button title='跳转' onPress={() => { Actions.pop() }}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
})
