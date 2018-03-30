import React, { Component } from 'react'
import { getProfileEntry, isProfileEntryEmpty } from '../selectors'

import AutosavingTextField from '../../shared/AutosavingTextField'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateEntry } from '../actions'
import { withStyles } from 'material-ui/styles'

class CharacterProfileEntry extends Component {
  render () {
    const { classes, className, entry, editMode, visible } = this.props

    if (!visible) return null

    const inputProps = {
      classes: {
        root: classes.inputRoot,
        input: classes.input
      }
    }
    if (!editMode) {
      inputProps.disableUnderline = true
      inputProps.classes.input = classNames(
        inputProps.classes.input, classes.inputDisabled)
    }

    return (
      <div className={classNames(classes.entry, className)}>
        <AutosavingTextField
          label={entry.title}
          defaultValue={entry.value}
          disabled={!editMode}
          InputProps={inputProps}
          onSave={(value) => this.props.update(entry.id, value)}
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
  entryId: PropTypes.string.isRequired,
  entry: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired
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
  input: {
    '&:hover': {
      cursor: 'text'
    },

    // Workaround: https://github.com/plotify/plotify/issues/132
    overflow: 'hidden'
  },
  inputDisabled: {
    color: theme.palette.text.primary
  }
})

const mapStateToProps = (state, ownProps) => ({
  entry: getProfileEntry(state, ownProps.entryId),
  visible: ownProps.editMode || !isProfileEntryEmpty(state, ownProps.entryId)
})

const mapDispatchToProps = (dispatch) => ({
  update: (id, value) => dispatch(updateEntry(id, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CharacterProfileEntry))
