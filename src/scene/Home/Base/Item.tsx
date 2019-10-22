import React from 'react'
import { Text, View } from 'react-native'
import { Map } from 'immutable'
import Component from '../../../Component'

interface Props {
  info: Map<any, any>;
}
export default class Item extends Component<Props> {
  render () {
    console.log(this.props.info.get('name'), '更新了')
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>{this.props.info.get('name')}</Text>
        <Text>{this.props.info.get('age')}</Text>
      </View>
    )
  }
}
