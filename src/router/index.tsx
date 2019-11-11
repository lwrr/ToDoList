import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import {Router,Stack,Scene,Lightbox,Actions} from 'react-native-router-flux'
import store from '../store'
import { statusHeight } from '../style'
import HeaderBack from '../components/HeaderBack'
import TabsBar from '../components/TabsBar'

import Home from '../scene/Home'
import ToDo from '../scene/ToDo'
import My from '../scene/My'
import Login from '../scene/Login'
import MyCollect from '../scene/My/MyCollect'
import Remote from '../scene/Remote'

// const Back = Platform.OS !== 'ios' ? <HeaderBack /> : null
const Back =  <HeaderBack /> 

const router = () =>{

  return (
    <Router sceneStyle={{backgroundColor: '#fff'}}>
      <Scene key='root'
        renderBackButton={() => Back} 
        navigationBarStyle={styles.navigationBarStyle}
        titleStyle={styles.titleStyle}
        headerLayoutPreset='center'>
        <Scene tabs hideNavBar 
          activeBackgroundColor='rgba(0,0,0,0.5)'
          activeTintColor='red'
          tabBarComponent={TabsBar} 
        >
          <Scene key='Home' hideNavBar title='首页' component={Home}></Scene>
          {/* <Scene key='ToDo' hideNavBar title='ToDo' component={ToDo}></Scene> */}
          <Scene key='My' title='我的' component={My}></Scene>
         
        </Scene>
        <Scene key='Login' title='登录' component={Login}  
          rightButtonImage={require('../images/set.png')} 
          rightTitle='跳过' 
          onRight={()=>{Actions.Home()}}
          rightButtonTextStyle={{fontSize:20,color:'#ccc'}}
        ></Scene>
        <Scene key='MyCollect' title='收藏' component={MyCollect}
          back={true} renderBackButton={() => Back}
        ></Scene>
        <Scene key='Remote' title='修改' component={Remote} back={true} renderBackButton={() => Back}></Scene>
        
      </Scene>
      
    </Router>)
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: '#fff',
    height: Platform.OS === 'android' ? 44 + statusHeight : 44,
    paddingTop: Platform.OS === 'android' ? statusHeight : 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(255, 255, 255, 0)',
  },
  titleStyle: {
    fontSize: 18,
  },
})
export default router
