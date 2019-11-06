import React from 'react'
import { View, TouchableOpacity,Text,TextInput ,Image,StyleSheet} from 'react-native'
import { List, Map } from 'immutable'
import { statusHeight } from '../../../style/index'
import Component from '../../../Component'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import Item from '../../Home/Base/Item'

interface Props {}
class MyCollect extends Component<Props> {
  state = {
    title:'',
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Item></Item>
        </View>
      </View>
     
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  list: {
    flex: 1,
  },
  search: {
    backgroundColor:'#ccc',
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 14,
    paddingRight: 14,
    paddingVertical:8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  searchTextBox: {
    flex: 1,
  },
  searchText: {
    height: 44,
    lineHeight: 44,
    fontSize: 16,
    color: '#999',
  },
  searchBtn:{
    borderLeftWidth:1,
    borderLeftColor:'#efefef',
    paddingLeft:15,
   
  },
  searchBtnText:{
    color: '#999',
    fontSize: 16,
  
  },
  
  location: {
    position: 'relative',
    width: 46,
    height: 58,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  locationImg: {
    width: 46,
    height: 58,
  },
  locationHead: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 38,
    height: 38,
    borderRadius: 19,
  },
})

export default connect((state: any) => ({
 
}),{})(MyCollect)