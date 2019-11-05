import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { color } from '../../style'
interface Props {
  selected: boolean;
  tabBarLabel: string;
  name: string;
}
export default class TabIcon extends Component<Props> {
  render () {
    let iconColor = this.props.selected ? color.main : '#333'
    let icon
    switch (this.props.name) {
      case 'Home':
        icon = this.props.selected ? require('../../images/home-act.png') : require('../../images/home.png')
        break
      case 'Price':
        icon = this.props.selected ? require('../../images/price-act.png') : require('../../images/price.png')
        break
      case 'Index':
        icon = this.props.selected ? require('../../images/index-act.png') : require('../../images/index.png')
        break
      case 'Map':
        icon = this.props.selected ? require('../../images/map-act.png') : require('../../images/map.png')
        break
      case 'My':
        icon = this.props.selected ? require('../../images/my-act.png') : require('../../images/my.png')
        break
    }
    return (
      <View style={{ height: '100%', flex: 1, alignItems: 'center', alignSelf: 'center' }}>
        <Image style={{ height: 24, width: 24, marginTop: 6 }} source={icon} />
        <Text style={{ fontSize: 10, lineHeight: 14, color: iconColor }}>{this.props.tabBarLabel}</Text>
      </View>
    )
  }
}
