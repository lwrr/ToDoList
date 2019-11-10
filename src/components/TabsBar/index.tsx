import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import TabIcon from './TabIcon'
import { px1 } from '../../style/index'
import isIPhoneX from '../../utils/isIPhoneX'

interface Props {}
export default class TabsBar extends Component<Props> {
  state = {
  }
  changeTab = (sceneKey: string) => {
    Actions.jump(sceneKey)
  }
  render () {
    let { navigation } = this.props as { navigation: any }
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => this.changeTab('Home')}>
          <TabIcon tabBarLabel='首页' selected={navigation.state.index === 0} name='Home' />
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => this.changeTab('ToDo')}>
          <TabIcon tabBarLabel='ToDo' selected={navigation.state.index === 1} name='ToDo' />
        </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={1} style={styles.item} onPress={() => this.changeTab('My')}>
          <TabIcon tabBarLabel='我的' selected={navigation.state.index === 2} name='My' />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: isIPhoneX() ? 49 + 34 : 49,
    flexDirection: 'row',
    borderTopWidth: px1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    paddingBottom: isIPhoneX() ? 34 : 0,
  },
  item: {
    flex: 1,
  },
})

