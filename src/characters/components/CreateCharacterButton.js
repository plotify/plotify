import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import { openCreateCharacterDialog } from '../actions'

const CreateCharacterButton = (props) => (
  <Tooltip title='Neuen Charakter erstellen' placement='bottom'>
    <IconButton
      color='contrast'
      aria-label='add'
      onClick={props.onClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
)

CreateCharacterButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(openCreateCharacterDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacterButton)
