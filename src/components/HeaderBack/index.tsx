import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

interface Props {}
export default class HeaderBack extends Component<Props> {
  render () {
    return (
      <TouchableOpacity style={styles.back} activeOpacity={1} onPress={() => { Actions.pop() }}>
        <Image style={styles.backImage} source={require('../../images/back.png')} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    justifyContent: 'center',
    height: 44,
    paddingLeft: 14,
    paddingRight: 14,
  },
  backImage: {
    width: 8,
    height: 14,
  },
})
