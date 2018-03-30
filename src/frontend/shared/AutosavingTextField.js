import React, { Component } from 'react'

import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

class AutosavingTextField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.defaultValue,
      savedValue: this.props.defaultValue,
      dirty: false,
      timer: null,
      saving: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentWillUnmount () {
    this.handleSave()
  }

  async handleChange (event) {
    const dirty = this.state.savedValue !== event.target.value
    await this.setState({
      dirty,
      value: event.target.value
    })
    if (dirty) this.startTimer()
  }

  startTimer () {
    clearTimeout(this.state.timer)
    const timer = setTimeout(this.handleSave, this.props.editThreshold)
    this.setState({ timer })
  }

  /**
   * Verifies the current state of the value (dirty etc.)
   * and calls parents save function.
   */
  async handleSave () {
    const { dirty, saving, value, timer } = this.state
    if (dirty && !saving) {
      try {
        this.setState({ saving: true })
        await this.props.onSave(value)
        this.setState({
          savedValue: value,
          dirty: false
        })
        clearTimeout(timer)
      } catch (error) {
        // TODO: error handling
        console.error('[AutosavingTextField] Fehler beim automatischen Speichern:', error)
      }
      this.setState({ saving: false })
    }
  }

  render () {
    const {
      classes,
      fullWidth,
      multiline,
      disabled,
      InputProps,
      label
    } = this.props
    return (
      <TextField
        label={this.state.dirty && label ? label + ' •' : label}
        value={this.state.value}
        InputLabelProps={{className: classes.inputLabel}}
        InputProps={InputProps}
        fullWidth={fullWidth}
        disabled={disabled}
        multiline={multiline}
        onBlur={this.handleSave}
        onChange={this.handleChange}
      />
    )
  }
}

AutosavingTextField.propTypes = {
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  InputProps: PropTypes.object,
  defaultValue: PropTypes.any,
  label: PropTypes.any,

  /**
   * Save Function to ensure auto save.
   */
  onSave: PropTypes.func.isRequired,

  /**
   * Threshold defines the maximum timeframe (in ms) between
   * edits until a save procedure will be initiated.
   */
  editThreshold: PropTypes.number
}

AutosavingTextField.defaultProps = {
  editThreshold: 1200
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
