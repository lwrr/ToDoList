import React from 'react'
import {Router,Stack,Scene,Lightbox} from 'react-native-router-flux'
import Home from '../scene/Home'
import ToDo from '../scene/ToDo'
import My from '../scene/My'
import Tips from '../scene/Tips'

const router = () =>{

  return (<Router>
    <Stack key='root'>
      <Scene tabs hideNavBar>
        <Scene key='ToDo' hideNavBar title='ToDo' component={ToDo}></Scene>
        <Scene key='Home' hideNavBar title='首页' component={Home}></Scene>
        <Scene key='My' hideNavBar title='我的' component={My}></Scene>
      </Scene>
      <Lightbox>
        <Scene key='Tips' component={Tips}></Scene>
      </Lightbox>
    </Stack>
    
  </Router>)
}

export default router
