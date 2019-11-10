import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
}
export default class NoDataBottom extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>没有更多数据了</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    fontSize: 12,
    color: '#999',
  },
})
