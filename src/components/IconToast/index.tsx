import React, { Component } from 'react'
import { Modal, View, Text, Image, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native'  // eslint-disable-line

interface Props {
  type?: string;
  style?: StyleProp<ViewStyle>;
  title?: string;
  image?: string;
  visible: boolean;
  renderIcon?: (() => JSX.Element) | false;
}
export default class IconToast extends Component<Props> {
  renderIcon () {
    if (this.props.renderIcon) return this.props.renderIcon
    if (this.props.image) return <Image source={{ uri: this.props.image }} />
    if (this.props.type === 'loading') return <ActivityIndicator size='large' color='rgba(255, 255, 255, 1)' />
  }
  render () {
    return (
      <Modal
        transparent={true}
        visible={this.props.visible}>
        <View style={[styles.container, this.props.style]}>
          <View style={styles.box}>
            <View style={styles.icon}>
              {this.renderIcon()}
            </View>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
  },
})
