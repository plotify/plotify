import { disableCharacterEditMode, enableCharacterEditMode } from '../actions'
import { isCharacterEditModeEnabled, isCharacterSelected } from '../selectors'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import { connect } from 'react-redux'

const ToggleEditModeButton = (props) => {
  const {
    characterSelected,
    editModeEnabled,
    enableCharacterEditMode,
    disableCharacterEditMode
  } = props

  const tooltip = editModeEnabled ? 'Charakter nicht mehr bearbeiten' : 'Charakter bearbeiten'
  const action = editModeEnabled ? disableCharacterEditMode : enableCharacterEditMode
  const text = editModeEnabled ? 'Fertig' : 'Bearbeiten'

  return (
    <Tooltip title={tooltip} placement='bottom'>
      <Button
        color='inherit'
        onClick={action}
        disabled={!characterSelected}
      >
        {text}
      </Button>
    </Tooltip>
  )
}

ToggleEditModeButton.propTypes = {
  characterSelected: PropTypes.bool.isRequired,
  editModeEnabled: PropTypes.bool.isRequired,
  enableCharacterEditMode: PropTypes.func.isRequired,
  disableCharacterEditMode: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  characterSelected: isCharacterSelected(state),
  editModeEnabled: isCharacterEditModeEnabled(state)
})

const mapDispatchToProps = (dispatch) => ({
  enableCharacterEditMode: () => dispatch(enableCharacterEditMode()),
  disableCharacterEditMode: () => dispatch(disableCharacterEditMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleEditModeButton)
