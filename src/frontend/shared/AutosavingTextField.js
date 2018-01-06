import React, { Component } from 'react'

import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

class AutosavingTextField extends Component {
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

  /**
   * TODO: apply necessary changes before unmounting.
   */
  componentWillUnmount () {
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    const { defaultValue, onSave, ...other } = this.props
    return (
      <TextField
        onFocus={() => {}}
        onBlur={() => {}}
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
  onSave: PropTypes.func.isRequired
}

AutosavingTextField.defaultProps = {

}

const styles = theme => ({
  inputLabel: {
    width: '100%',
    overflowX: 'hidden',
    padding: '1px 1px 1px 0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: '200ms'
  }
})

export default withStyles(styles)(AutosavingTextField)
