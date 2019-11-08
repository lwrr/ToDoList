import React from 'react'
import { View, TouchableOpacity,Text,TextInput ,Image,StyleSheet,FlatList} from 'react-native'
import { List, Map } from 'immutable'
import { statusHeight } from '../../style/index'
import Component from '../../Component'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import Item from './Base/Item'
import {GetNewsListAction,SearchNewsAction } from '../../store/actions/news'
interface Props {
  SearchNewsAction:any,
  GetNewsListAction:any,
  newsList:any,
  userInfo:any,

}
class Home extends Component<Props> {
  state = {
    title:'',
  }
  async componentDidMount (){
    try{
      console.log(12)
      // 判断是否登录，没登录跳转到登录页面

      this.props.GetNewsListAction('')

    }catch(err){

    }
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
          />
        </View>
      </View>
     
    ) 
  }
  searchNews = () =>{
    console.log(this.state.title)
    this.props.GetNewsListAction(this.state.title)
  }
  renderItem= ({ item,index,separators })=>{
    return (
      <View >
        <Item news={item}></Item>
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

export default connect((state: any) => {
  console.log('connect')
  console.log(state.news.newsList)
  return {newsList:state.news.newsList,
    userInfo: state.user.userInfo}
},
{
  SearchNewsAction,
  GetNewsListAction,
})(Home)
