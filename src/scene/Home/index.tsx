import React from 'react'
import { View, Button } from 'react-native'
import { List, Map } from 'immutable'
import Component from '../../Component'
import { Actions } from 'react-native-router-flux'

import Item from './Base/Item'

interface Props {}
export default class Home extends Component<Props> {
  state = {
    list: List(
      [
        Map({
          id: 1,
          name: '张三',
          age: 18,
        }),
        Map({
          id: 2,
          name: '李四',
          age: 20,
        }),
      ],
    ),
  }
  ageAdd = () => {
    this.setState({
      list: this.state.list.updateIn([0, 'age'], val => val + 1),
    })
  }
  // async componentDidMount () {
  //   this._getList()
  // }
  // async _getList () {
  //   try {
  //     let data = await ajax()
  //     console.log(data)
  //     // Alert.alert('', JSON.stringify(data))
  //     await this.setStateAsync({
  //       list: data,
  //     })
  //     let list = this.state.list
  //     list.filter((item) => item === 1)
  //   } catch (error) {}
  // }
  render () {
    return (
      <View>
        {this.state.list.map(item => <Item key={item.get('id')} info={item}></Item>)}
        <Button title='修改张三的年龄' onPress={this.ageAdd}></Button>
        <Button title='跳转' onPress={()=>{Actions.jump('My')}}></Button>
      </View>
    )
  }
}
