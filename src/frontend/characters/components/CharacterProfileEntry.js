import React, { Component } from 'react'

import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

class CharacterProfileEntry extends Component {
  render () {
    const { classes, entry } = this.props
    return (
      <div className={classes.entry}>
        <TextField
          className={classes.textField}
          label={entry.title}
          defaultValue={entry.value}
          InputProps={{disableUnderline: true,
            classes: {
              input: classes.input
            }}}
          InputLabelProps={{className: classes.inputLabel}}
          disabled
          fullWidth
        />
      </div>
    )
  }
}

CharacterProfileEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  entry: PropTypes.object.isRequired
}

const styles = (theme) => ({
  entry: {
    padding: theme.spacing.unit * 2,
    flex: '2 0 auto'
  },
  textField: {
    maxWidth: '200px'
  },
  input: {
    color: theme.palette.text.primary
  },
  inputLabel: {
    // overflow: 'hidden', // TODO Fehler:  Schneidet das Label auch oben und unten ab.
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

export default withStyles(styles)(CharacterProfileEntry)
