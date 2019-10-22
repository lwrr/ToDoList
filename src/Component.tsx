import { Component as ReactComponent } from 'react'
import { is } from 'immutable'

export default class Component<P = {}> extends ReactComponent<P> {
  // shouldComponentUpdate (props, state) {
  //   const thisProps = this.props || {}
  //   const thisState = this.state || {}
  //   const nextProps = props || {}
  //   const nextState = state || {}
  //   if (
  //     Object.keys(thisProps).length !== Object.keys(nextProps).length ||
  //     Object.keys(thisState).length !== Object.keys(nextState).length
  //   ) {
  //     return true
  //   }
    
  //   for (const key in nextProps) {
  //     if (!is(thisProps[key], nextProps[key])) {
  //       return true
  //     }
  //   }
  //   for (const key in nextState) {
  //     if (!is(thisState[key], nextState[key])) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  setStateAsync (state): Promise<any> {
    return new Promise((resolve, reject) => {
      this.setState(state, () => {
        resolve()
      })
    })
  }
}
