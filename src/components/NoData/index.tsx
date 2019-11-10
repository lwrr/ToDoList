import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface Props {
}
export default class NoData extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../images/nodata.png')} />
        <Text style={styles.text}>暂无数据</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 14,
    color: '#999',
  },
})
