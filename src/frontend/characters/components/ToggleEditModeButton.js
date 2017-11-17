import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import ViewIcon from 'material-ui-icons/RemoveRedEye'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { isCharacterSelected, isCharacterEditModeEnabled } from '../selectors'
import { enableCharacterEditMode, disableCharacterEditMode } from '../actions'

const ToggleEditModeButton = (props) => {
  const {
    classes, characterSelected,
    editModeEnabled, enableCharacterEditMode,
    disableCharacterEditMode
  } = props

  const className = !characterSelected ? classes.noCharacterSelected : ''

  if (editModeEnabled) {
    return (
      <Tooltip title='Charakter nicht mehr bearbeiten' placement='bottom' className={className}>
        <IconButton
          onClick={disableCharacterEditMode}
          color='contrast'
          aria-label='view'>
          <ViewIcon />
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip title='Charakter bearbeiten' placement='bottom' className={className}>
        <IconButton
          onClick={enableCharacterEditMode}
          color='contrast'
          aria-label='edit'>
          <EditIcon />
        </IconButton>
      </Tooltip>
    )
  }
}

ToggleEditModeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  characterSelected: PropTypes.bool.isRequired,
  editModeEnabled: PropTypes.bool.isRequired,
  enableCharacterEditMode: PropTypes.func.isRequired,
  disableCharacterEditMode: PropTypes.func.isRequired
}

const style = (theme) => ({
  noCharacterSelected: {
    display: 'none'
  }
})

const StyledToggleEditModeButton = withStyles(style)(ToggleEditModeButton)

const mapStateToProps = (state) => ({
  characterSelected: isCharacterSelected(state),
  editModeEnabled: isCharacterEditModeEnabled(state)
})

const mapDispatchToProps = (dispatch) => ({
  enableCharacterEditMode: () => dispatch(enableCharacterEditMode()),
  disableCharacterEditMode: () => dispatch(disableCharacterEditMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledToggleEditModeButton)
