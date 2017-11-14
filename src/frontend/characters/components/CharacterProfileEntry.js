import React, { Component } from 'react'

import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

class CharacterProfileEntry extends Component {
  render () {
    const { classes, className, entry, disabled } = this.props
    let inputProps
    if (disabled) {
      inputProps = {
        disableUnderline: true,
        classes: {
          input: classes.inputDisabled
        }
      }
    } else {
      inputProps = {
        classes: {
          root: classes.inputRoot
        }
      }
    }
    return (
      <div className={classNames(classes.entry, className)}>
        <TextField
          className={classNames({
            [classes.textField]: !disabled
          })}
          label={entry.title}
          defaultValue={entry.value}
          InputLabelProps={{className: classes.inputLabel}}
          disabled={disabled}
          InputProps={inputProps}
          fullWidth
          multiline
        />
      </div>
    )
  }
}

CharacterProfileEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  entry: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}

CharacterProfileEntry.defaultProps = {
  disabled: true
}

const styles = (theme) => ({
  entry: {
    padding: theme.spacing.unit * 3
  },
  inputRoot: {
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
  },
  inputDisabled: {
    color: theme.palette.text.primary
  },
  inputLabel: {
    width: '100%',
    overflowX: 'hidden',
    padding: '1px 1px 1px 0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: '200ms'
  },
  textField: {
    '&:hover': {
      cursor: 'text'
    }
  }
})

export default withStyles(styles)(CharacterProfileEntry)
