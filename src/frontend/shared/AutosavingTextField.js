import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

export default class AutosavingTextField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // dirty = savedState != currentState
      dirty: false,
      value: this.props.defaultValue
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUpdate (_, nextState) {

  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    const {defaultValue, ...other} = this.props
    return (
      <TextField
        onChange={this.handleChange}
        value={this.state.value}
        {...other}
      />
    )
  }
}

AutosavingTextField.propTypes = {
  /**
   * Save Function to ensure auto save.
   */
  save: PropTypes.func.isRequired
}

AutosavingTextField.defaultProps = {

}