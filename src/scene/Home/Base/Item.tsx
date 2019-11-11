import React from 'react'
import { Text, View,Image,TouchableOpacity,StyleSheet } from 'react-native'
import { Map } from 'immutable'
import Component from '../../../Component'
import {px1,color} from '../../../style'
import {connect} from 'react-redux'
import {UpdateNewsAction} from '../../../store/actions/news'

interface Props {
  news:any;
  UpdateNewsAction:any
}
class Item extends Component<Props> {
  render () {
   
    return (
      <View style={styles.container}>
        <Image  source={{uri: this.props.news.pic}} 
          style={styles.imageWrap} ></Image>
        <Text style={styles.textWrap} numberOfLines={2} >{this.props.news.content}</Text>
        <TouchableOpacity 
          onPress ={this.changeCollect}
        >
          <Image style={styles.touchImg} source={this.props.news.collect == 1?require('../../../images/collect.png') : require('../../../images/noCollect.png')} />
        </TouchableOpacity>
      </View>
    )
  }
  changeCollect =() =>{
    let coll = this.props.news.collect
    this.props.UpdateNewsAction({id:this.props.news.id,collect:coll})
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    paddingVertical:14,
    paddingHorizontal:14,
    borderBottomColor:'#efefef',
    borderBottomWidth:px1,
  },
  imageWrap:{
    width:100,
    height:80,
    borderRadius:3,
    backgroundColor:color.BgDack,
    overlayColor:'transparent',
    flexShrink:0,
    resizeMode:'cover',
  },
  textWrap:{
    flex:1,
    fontSize:color.fontSizeL,
    lineHeight:24,
    paddingHorizontal:20,
  },
  collect:{
    width:20,
    height:20,
    borderRadius:10,
    borderColor:color.ColorDark,
    borderWidth:px1,
    backgroundColor:color.ColorWhite,
  },
  touchImg:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  active:{
    backgroundColor:color.ColorBlue,
  },
})
export default connect((state: any) => ({}),
  {UpdateNewsAction})(Item)
