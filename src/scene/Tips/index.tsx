import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Component from '../../Component'

interface Props {
  msg:string,
}
export default class Tips extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Text>我是提示</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
