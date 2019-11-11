import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview'
// import DeviceInfo from 'react-native-device-info'
// import { getProducts, clearProductsIOS, requestPurchaseWithQuantityIOS, purchaseUpdatedListener, purchaseErrorListener, finishTransactionIOS } from 'react-native-iap'
// import alipay from '../../utils/alipay'
// import wxpay from '../../utils/wxpay'
import { UpdateUserInfoAction } from '../../store/actions/user'
import storage from '../../config/storage'
import Component from '../../Component'

interface MessageContext {
  code: number;
  data?: any;
  err?: any;
}

interface Props {
  userInfo: any;
  UpdateUserInfoAction: any;
}
class Browser extends Component<Props> {
  state={
    url:'file:///android_asset/update.html',
    userId:'',
    token:'',
  }
 
  componentWillUnmount () {
   
  }
  componentDidMount = async () => {
    try{
      await storage
        .load({
          key: 'userInfo',
        })
        .then(ret => {
          console.log(12)
          console.log(ret.userId,ret.token)
          this.setStateAsync({
            userId:ret.userId,
            token:ret.token,
          })
          
        })
        .catch(err => {
          Actions.Login()
        })
    }catch(err){
    }
  }
  // webChange = (navState: any) => {
  //   Actions.refresh({ title: navState.title })
  // }
  initChart = () => {
    return `
      var postMessageCallback = {}
      window.api = {};
      window.api.userInfo = ${JSON.stringify(this.props.userInfo)};
     
      window.api.pop = function () {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'pop'
        }));
      }
      window.api.updateUserInfo = function (data, cb) {
        var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
        postMessageCallback[cbKey] = cb;
        
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'updateUserInfo',
          data: data,
          cbKey: cbKey
        }));
      }
      window.apiready && window.apiready();
    `
  }
  listen = (e: any) => {
    let res = JSON.parse(e.nativeEvent.data)
    if (this.message[res.type]) {
      this.message[res.type](res)
    }
  }

  message: {
    [propName: string]: any;
  } = {
    pop: () => {
      Actions.pop()
    },
    updateUserInfo: async (res: any) => {
      let context: MessageContext
      try {
        await this.props.UpdateUserInfoAction(this.state.userId,this.state.token,res.data)

        context = { code: 1, data: this.props.userInfo }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
    
   
  }
  send = (key: string, context: MessageContext, isDelete: boolean = true) => {
    console.log('send --------------'+key)
    this.webView.injectJavaScript('alert("修改成功");window.api.pop()')
    
    return
    this.webView.injectJavaScript(`
    alert(postMessageCallback['aaa']())
        postMessageCallback[${key}] && postMessageCallback[${key}](${JSON.stringify(context)});
        delete postMessageCallback[${key}];
      `)
    if (isDelete) {
      
    } else {
      this.webView.injectJavaScript(`
        postMessageCallback['${key}'] && postMessageCallback['${key}'](${JSON.stringify(context)});
      `)
    }
  }
  webView = null
  render () {
    return (
      <WebView
        ref={ref => (this.webView = ref)}
        style={styles.container}
        source={{ uri: 'file:///android_asset/update.html' }}
        // onNavigationStateChange={this.webChange}
        injectedJavaScript={this.initChart()}
        onMessage={this.listen}
      >
      </WebView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect((state: any) => ({
  // theme: state.set.theme,
  userInfo: state.user.userInfo,
}), {
  UpdateUserInfoAction,
})(Browser)
