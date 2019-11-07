import React from 'react'
import { Text, View,Image,TouchableOpacity,StyleSheet } from 'react-native'
import { Map } from 'immutable'
import Component from '../../../Component'
import {px1,color} from '../../../style'

interface Props {
  news:any;
}
export default class Item extends Component<Props> {
  render () {
   
    return (
      <View style={styles.container}>
        <Image  source={{uri: this.props.news.pic}} 
          style={styles.imageWrap} ></Image>
        <Text style={styles.textWrap} numberOfLines={2} >{this.props.news.content}</Text>
        <TouchableOpacity style={styles.collect}></TouchableOpacity>
      </View>
    )
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
  active:{
    backgroundColor:color.ColorBlue,
  },
})
