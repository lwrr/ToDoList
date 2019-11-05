import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import {Router,Stack,Scene,Lightbox,Actions} from 'react-native-router-flux'
import store from '../store'
import { statusHeight } from '../style'
import HeaderBack from '../components/HeaderBack'
// import TabsBar from '../components/TabsBar'

import Home from '../scene/Home'
import ToDo from '../scene/ToDo'
import My from '../scene/My'
import Login from '../scene/Login'

const Back = Platform.OS === 'ios' ? <HeaderBack /> : null

const router = () =>{

  return (
    <Router sceneStyle={{backgroundColor: '#f7f8f9'}}>
      <Scene key='root'
        renderBackButton={() => Back} 
        navigationBarStyle={styles.navigationBarStyle}
        titleStyle={styles.titleStyle}>
        <Scene key='Login' hideNavBar title='' component={Login}></Scene>
        <Scene tabs hideNavBar 
        // tabBarComponent={TabsBar} 
        >
          <Scene key='Home' hideNavBar title='首页' component={Home}></Scene>
          <Scene key='ToDo' hideNavBar title='ToDo' component={ToDo}></Scene>
          <Scene key='My' title='我的' component={My} rightButtonImage={require('../images/set.png')} onRight={() => {
            
            Actions.Login()
          }} ></Scene>
        </Scene>
        
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
