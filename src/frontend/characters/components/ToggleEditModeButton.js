import React, { Fragment } from 'react'
import { disableCharacterEditMode, enableCharacterEditMode } from '../actions'
import { isCharacterEditModeEnabled, isCharacterSelected } from '../selectors'

import EditIcon from 'material-ui-icons/Edit'
import IconButton from 'material-ui/IconButton'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'
import { Typography } from 'material-ui'
import ViewIcon from 'material-ui-icons/RemoveRedEye'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const ToggleEditModeButton = (props) => {
  const {
    classes, characterSelected,
    editModeEnabled, enableCharacterEditMode,
    disableCharacterEditMode
  } = props

  const className = !characterSelected ? classes.noCharacterSelected : ''

  if (editModeEnabled) {
    return (
      <Fragment>
        {props.type === 'text' &&
          <Typography
            className={props.classes.button}
            type='button'
            onClick={disableCharacterEditMode}>
            Fertig
          </Typography>
        }
        {props.type === 'icon' &&
          <Tooltip title='Charakter nicht mehr bearbeiten' placement='bottom' className={className}>
            <IconButton
              onClick={disableCharacterEditMode}
              color='contrast'
              aria-label='view'>
              <ViewIcon />
            </IconButton>
          </Tooltip>
        }
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {props.type === 'text' &&
          <Typography
            className={props.classes.button}
            type='button'
            onClick={enableCharacterEditMode}>
            Bearbeiten
          </Typography>
        }
        {props.type === 'icon' &&
          <Tooltip title='Charakter bearbeiten' placement='bottom' className={className}>
            <IconButton
              onClick={enableCharacterEditMode}
              color='contrast'
              aria-label='edit'>
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
      </Fragment>
    )
  }
}

ToggleEditModeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  characterSelected: PropTypes.bool.isRequired,
  editModeEnabled: PropTypes.bool.isRequired,
  enableCharacterEditMode: PropTypes.func.isRequired,
  disableCharacterEditMode: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'icon']).isRequired
}

ToggleEditModeButton.defaultProps = {
  type: 'text'
}

const style = (theme) => ({
  noCharacterSelected: {
    display: 'none'
  },
  button: {
    '&:hover': {
      cursor: 'pointer'
    }
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
