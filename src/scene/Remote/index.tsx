import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { WebView } from 'react-native-webview'
import DeviceInfo from 'react-native-device-info'
import { getProducts, clearProductsIOS, requestPurchaseWithQuantityIOS, purchaseUpdatedListener, purchaseErrorListener, finishTransactionIOS } from 'react-native-iap'
import alipay from '../../utils/alipay'
import wxpay from '../../utils/wxpay'
import { UpdateUserInfoActions } from '../../store/actions/user'

interface MessageContext {
  code: number;
  data?: any;
  err?: any;
}

interface Props {
  theme: string;
  userInfo: any;
  UpdateUserInfoActions: (data: any) => Promise<any>;
  url: string;
}
class Browser extends Component<Props> {
  shouldComponentUpdate (nextProp: Props) {
    return nextProp.url !== this.props.url
  }
  componentWillUnmount () {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove()
      this.purchaseUpdateSubscription = null
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove()
      this.purchaseErrorSubscription = null
    }
    clearProductsIOS()
  }
  webChange = (navState: any) => {
    Actions.refresh({ title: navState.title })
  }
  initChart = () => {
    return `
      var postMessageCallback = {}
      window.api = {};
      window.api.userInfo = ${JSON.stringify(this.props.userInfo)};
      window.api.deviceInfo = {
        os: ${JSON.stringify(Platform.OS)},
        version: '${DeviceInfo.getVersion()}'
      }
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
      window.api.iap = {
        getProducts: function (skus, cb) {
          var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
          postMessageCallback[cbKey] = cb;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'getProducts',
            data: skus,
            cbKey: cbKey
          }));
        },
        clearProductsIOS: function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'clearProductsIOS',
          }));
        },
        requestPurchaseWithQuantityIOS: function (sku, num, cb) {
          var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
          postMessageCallback[cbKey] = cb;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'requestPurchaseWithQuantityIOS',
            data: {
              sku: sku,
              num: num
            },
            cbKey: cbKey
          }));
        },
        finishTransactionIOS: function (transactionId) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'requestPurchaseWithQuantityIOS',
            data: transactionId
          }));
        },
        purchaseListener: function (cb) {
          var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
          postMessageCallback[cbKey] = cb;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'purchaseListener',
            cbKey: cbKey
          }));
        },
        purchaseListenerRemove: function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'purchaseListenerRemove',
          }));
        },
      }
      window.api.pay = {
        alipay: function (data, cb) {
          var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
          postMessageCallback[cbKey] = cb;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'alipay',
            data: data,
            cbKey: cbKey
          }));
        },
        wxpay: function (data) {
          var cbKey = Math.random().toString(36).substr(2) + (new Date()).getTime();
          postMessageCallback[cbKey] = cb;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'wxpay',
            data: data,
            cbKey: cbKey
          }));
        },
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
  purchaseUpdateSubscription: any
  purchaseErrorSubscription: any
  message: {
    [propName: string]: any;
  } = {
    pop: () => {
      Actions.pop()
    },
    updateUserInfo: async (res: any) => {
      let context: MessageContext
      try {
        await this.props.UpdateUserInfoActions({
          ...this.props.userInfo,
          ...res.data,
        })
        context = { code: 1, data: this.props.userInfo }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
    getProducts: async (res: any) => {
      let context: MessageContext
      try {
        let data = await getProducts(res.data)
        context = { code: 1, data }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
    clearProductsIOS: () => {
      if (Platform.OS !== 'ios') return
      clearProductsIOS()
    },
    requestPurchaseWithQuantityIOS: async (res: any) => {
      if (Platform.OS !== 'ios') return
      let context: MessageContext
      try {
        await requestPurchaseWithQuantityIOS(res.data.sku, res.data.num)
        context = { code: 1 }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
    finishTransactionIOS: (res: any) => {
      if (Platform.OS !== 'ios') return
      finishTransactionIOS(res.data)
    },
    purchaseListener: (res: any) => {
      this.purchaseUpdateSubscription = purchaseUpdatedListener((purchase: any) => {
        let context: MessageContext = {
          code: 1,
          data: purchase,
        }
        this.send(res.cbKey, context, false)
      })
      this.purchaseErrorSubscription = purchaseErrorListener((error: any) => {
        let context: MessageContext = {
          code: -1,
          err: error,
        }
        this.send(res.cbKey, context, false)
      })
    },
    purchaseListenerRemove: () => {
      if (this.purchaseUpdateSubscription) {
        this.purchaseUpdateSubscription.remove()
        this.purchaseUpdateSubscription = null
      }
      if (this.purchaseErrorSubscription) {
        this.purchaseErrorSubscription.remove()
        this.purchaseErrorSubscription = null
      }
    },
    alipay: async (res: any) => {
      if (Platform.OS !== 'android') return
      let context: MessageContext
      try {
        let data = await alipay.pay(res.data)
        context = { code: 1, data }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
    wxpay: async (res: any) => {
      if (Platform.OS !== 'android') return
      let context: MessageContext
      try {
        let data = await wxpay.pay(res.data)
        context = { code: 1, data }
      } catch (error) {
        context = { code: -1, err: error }
      }
      this.send(res.cbKey, context)
    },
  }
  send = (key: string, context: MessageContext, isDelete: boolean = true) => {
    if (isDelete) {
      this.webView!.injectJavaScript(`
        postMessageCallback['${key}'] && postMessageCallback['${key}'](${JSON.stringify(context)});
        delete postMessageCallback['${key}'];
      `)
    } else {
      this.webView!.injectJavaScript(`
        postMessageCallback['${key}'] && postMessageCallback['${key}'](${JSON.stringify(context)});
      `)
    }
  }
  webView: WebView | null = null
  render () {
    return (
      <WebView
        ref={(ele) => { this.webView = ele }}
        style={styles.container}
        source={{ uri: this.props.url }}
        onNavigationStateChange={this.webChange}
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
  theme: state.set.theme,
  userInfo: state.user,
}), {
  UpdateUserInfoActions,
})(Browser)
