import React from 'react'
import PropTypes from 'prop-types'
import UndoCharacterButton from './UndoCharacterButton'
import RedoCharacterButton from './RedoCharacterButton'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { isCharacterEditModeEnabled } from '../selectors'

const UndoRedoButtons = (props) => {
  const { classes, editModeEnabled } = props
  const className = !editModeEnabled ? classes.editModeDisabled : ''
  return (
    <div className={className}>
      <UndoCharacterButton />
      <RedoCharacterButton />
    </div>
  )
}

UndoRedoButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  editModeEnabled: PropTypes.bool.isRequired
}

const style = (theme) => ({
  editModeDisabled: {
    display: 'none'
  }
})

const StyledUndoRedoButtons = withStyles(style)(UndoRedoButtons)

const mapStateToProps = (state) => ({
  editModeEnabled: isCharacterEditModeEnabled(state)
})

export default connect(mapStateToProps)(StyledUndoRedoButtons)
