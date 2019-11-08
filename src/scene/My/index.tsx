import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity ,Image} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Component from '../../Component'
import {connect} from 'react-redux'
import {color,px1} from '../../style/index'

interface Props {
  userInfo:any
}
class My extends Component<Props> {

  componentDidMount = () =>{

  }
  swiper = () =>{
    if(this.props.userInfo && this.props.userInfo.id){
      Actions.Set()
    }else{
      Actions.Login()
    }
  }
  render () {
    let userInfo = this.props.userInfo
    return (
      <View style={styles.container}>
        <View style={styles.userWrap}>
          {userInfo && userInfo.id ?
            <Image style={styles.infoImage} source={require('../../images/default.png')} />
            :<Image style={styles.infoImage} source={require('../../images/default.png')} />
          }
          <TouchableOpacity onPress={this.swiper} activeOpacity={1} style={styles.infoText}>
            <Text style={styles.infoTextFir} numberOfLines={1}>{userInfo && userInfo.username?userInfo.username:'登录/注册'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listWrap}>
          <TouchableOpacity onPress={() =>{Actions.MyCollect()}}>
            <View style={[styles.item, { opacity: 0.5 }]}>
              <Image style={styles.itemImage} source={require('../../images/like.png')}></Image>
              <Text style={styles.itemText}>我的收藏</Text>
              <Image style={styles.itemBtn} source={require('../../images/back.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{Actions.MyCollect()}}>
            <View style={[styles.item, { opacity: 0.5 }]}>
              <Image style={styles.itemImage} source={require('../../images/like.png')}></Image>
              <Text style={styles.itemText}>修改信息</Text>
              <Image style={styles.itemBtn} source={require('../../images/back.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{Actions.MyCollect()}}>
            <View style={[styles.item, { opacity: 0.5 }]}>
              <Image style={styles.itemImage} source={require('../../images/like.png')}></Image>
              <Text style={styles.itemText}>联系我们</Text>
              <Image style={styles.itemBtn} source={require('../../images/back.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#efefef',
  },
  userWrap:{
    backgroundColor:'#fff',
    alignItems:'center',
    paddingVertical:20,

  },
  infoImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    
  },
  infoText: {
    paddingTop:20,
  },
  infoTextFir: {
    fontSize: 16,
    lineHeight: 26,
    color: '#000',
  },
 
  listWrap:{
    marginTop:10,
    backgroundColor:'#fff',
    flex:1,
  },
  item: {
    height:70,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth:px1,
    borderBottomColor:'#ccc',
    paddingHorizontal:14,
  },
  itemImage:{
    width: 24, 
    height: 24,
    flexShrink:0,
  },
  itemBtn:{
    flexShrink:0,
    transform:[{ rotateY: '180deg' }],
  },
  itemText:{
    flex:1,
    fontSize:color.fontSizeL,
    lineHeight:24,
    textAlign:'left',
    paddingHorizontal:14,
  },
 
})

export default connect((state: any) => ({userInfo:state.user.userInfo}),{})(My)
