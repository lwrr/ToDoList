import React from 'react'
import { View, TouchableOpacity,Text,TextInput ,Image,StyleSheet, FlatList} from 'react-native'
import { List, Map } from 'immutable'
import { statusHeight } from '../../../style/index'
import Component from '../../../Component'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import Item from '../../Home/Base/Item'
import {GetCollectNewsAction,GetNewsCountAction} from '../../../store/actions/news'
import {GetUserInfoAction } from '../../../store/actions/user'

import Loading from '../../../components/Loading/LoadingList'
import NoData from '../../../components/NoData'
import NoDataBottom from '../../../components/NoData/Bottom'


interface Props {
  GetCollectNewsAction:any,
  GetNewsCountAction:any,
  collectList:any,
  userInfo:any,
  
}
class MyCollect extends Component<Props> {
  state = {
    title:'',
    noData: false,
    currPage:1,
    pageCount: 0,
    pageSize:10,
    refreshing: false,
  }
  componentDidMount = async () =>{
    await this.getList(true)
  }
  async getList (init:boolean = false,msg:string='',collect='1'){
    if (init) {
      await this.setStateAsync({
        currPage: 1,
        pageCount: 0,
      })
    }
    if (this.state.currPage == 1) {
      let countObj = await this.props.GetNewsCountAction(msg,collect)
      console.log('----------------'+countObj.count)

      await this.setStateAsync({pageCount:Math.ceil(countObj.count/this.state.pageSize)})   
    }
    let data = await this.props.GetCollectNewsAction(this.props.userInfo.id, this.state.pageSize,this.state.currPage)
    

    if (this.state.currPage === 1 && (!data || data.length === 0)) {
      this.setState({ noData: true })
      
    }
   
  }
  onEndReached = () => {
    console.log('footer page ')
    console.log(this.state.currPage)
    console.log(this.state.pageCount)
    if (this.state.currPage === this.state.pageCount) return
    this.setState({
      currPage: this.state.currPage + 1,
    }, this.getList)
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={this.props.collectList}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            onEndReached={this.onEndReached}
            ListFooterComponent={
              <NoDataBottom /> 
            }
          />
        </View>
      </View>
     
    ) 
  }
  renderItem= ({ item,index,separators })=>{
    if(item.collect == 1){
      return (
        <View >
          <Item news={item}></Item>
        </View>
      )
    }
    
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

export default connect((state: any) => {
  console.log('mycollect connect ')
  console.log(state.news.collectList)
  return {
    collectList:state.news.collectList,
    userInfo: state.user.userInfo,
  }
}
,{
  GetCollectNewsAction,
  GetNewsCountAction,
})(MyCollect)
