import React from 'react'
import { View, TouchableOpacity,Text,TextInput ,Image,StyleSheet,FlatList,RefreshControl} from 'react-native'
import { List, Map } from 'immutable'
import { statusHeight } from '../../style/index'
import Component from '../../Component'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import Item from './Base/Item'
import {GetNewsListAction,GetNewsCountAction } from '../../store/actions/news'
import {GetUserInfoAction } from '../../store/actions/user'
import storage from '../../config/storage'

import Loading from '../../components/Loading/LoadingList'
import NoData from '../../components/NoData'
import NoDataBottom from '../../components/NoData/Bottom'

interface Props {
  GetNewsCountAction:any,
  GetNewsListAction:any,
  GetUserInfoAction:any,
  newsList:any,
  userInfo:any,

}
class Home extends Component<Props> {
  state = {
    title:'',
    noData: false,
    currPage:1,
    pageCount: 0,
    pageSize:10,
    refreshing: false,
  }
  async componentDidMount (){
    await this.getList(true)
    try{
      let userInfo = this.props.userInfo
      // // 判断是否登录，没登录跳转到登录页面
      if(!userInfo.username){
        await storage
          .load({
            key: 'userInfo',
          })
          .then(ret => {
            console.log(12)
            console.log(ret.userId,ret.token)
            this.props.GetUserInfoAction(ret.userId,ret.token)
          })
          .catch(err => {
            Actions.Login()
          })
        // this.props.GetNewsListAction(this.props.userInfo.id)
      }
    }catch(err){
    }
  }
  async getList (init:boolean = false,msg:string=''){
    if (init) {
      await this.setStateAsync({
        currPage: 1,
        pageCount: 0,
      })
    }
    if (this.state.currPage === 1) {
      let countObj = await this.props.GetNewsCountAction(msg)
      console.log('----------------'+countObj.count)

      await this.setStateAsync({pageCount:Math.ceil(countObj.count/this.state.pageSize)})   
    }
    let data = await this.props.GetNewsListAction(msg,this.state.pageSize,this.state.currPage)
    

    if (this.state.currPage === 1 && (!data || data.length === 0)) {
      this.setState({ noData: true })
      return
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
  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.getList(true)
    this.setState({ refreshing: false })
  }
  searchNews = async () =>{
    console.log(this.state.title)
    await this.getList(true,this.state.title)
  }
  renderItem= ({ item,index,separators })=>{
    return (
      <View >
        <Item news={item}></Item>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.searchWrapper} >
            <Image source={require('../../images/search.png')} style={styles.searchIcon} />
            <View style={styles.searchTextBox}>
              <TextInput style={styles.searchText} placeholder='请输入' placeholderTextColor='#999' 
                onChangeText={(title) => this.setState({ title })}
                onSubmitEditing={this.searchNews} ></TextInput>
            </View>
            <TouchableOpacity style={styles.searchBtn} activeOpacity={1} 
              onPress={this.searchNews}>
              <Text style={styles.searchBtnText}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.newsList}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            onEndReached={this.onEndReached}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this.onRefresh} />
            // }
            ListFooterComponent={
              this.state.currPage === this.state.pageCount ? <NoDataBottom /> : <Loading />
            }
          />
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
    backgroundColor:'#2581ff',
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
    height: 40,
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
  console.log('connect')
  console.log(state.news.newsList)
  return {newsList:state.news.newsList,
    userInfo: state.user.userInfo}
},
{
  GetNewsListAction,
  GetNewsCountAction,
  GetUserInfoAction,
})(Home)
