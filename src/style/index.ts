import { StatusBar, Platform, PixelRatio, Dimensions } from 'react-native'
import isIPhoneX from '../utils/isIPhoneX'

export const color =  {
  fontSizeS:12,
  fontSizeM:14,
  fontSizeL:16,
  fontSizeXL:18,
  fontSizeXXL:20,
  ColorDark:'#717171',
  ColorBlue:'#61dafb',
  ColorBlack:'#1a1a1a',
  ColorWhite:'#ffffff',
  ColorRed:'#ff0000',
  BgDack:'#b0b0b0',
  BgBlue:'#61dafb',
  main: '#4167a8',
  rise: '#ec4a49',
  fall: '#30a46a',
  flat: '#423c4f',
  line: '#e3e3e3',

}

export const statusHeight = (Platform.OS === 'android') ? (StatusBar.currentHeight ? StatusBar.currentHeight : 0) : (isIPhoneX() ? 44 : 20)
export const px1 = 1 / PixelRatio.get()
export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
