import * as Animated from 'animated/lib/targets/react-dom'

import React, { Component } from 'react'

export default class AppIcon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rotation: new Animated.Value(0)
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  componentWillMount () {
    this.rotate = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    // this.rotate.addListener(v => console.log(v));
  }

  handleDoubleClick (e) {
    this.state.rotation.setValue(0)
    Animated.spring(
      this.state.rotation,
      {
        toValue: 1
      }
    ).start()
  }

  render () {
    return (
      <Animated.div
        className={this.props.className}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        style={{
          transform: [
            {rotate: this.rotate}
          ]
        }}
      >
        <img
          style={{ height: '100%', width: '100%' }}
          src='./app-icon.png'
        />
      </Animated.div>
    )
  }
}
