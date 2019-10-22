import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface Props {
}
export default class LoadingList extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#79c5ff' />
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
})
