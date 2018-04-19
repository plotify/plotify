import AddIcon from '@material-ui/icons/Add'
import IconButton from 'material-ui/IconButton'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import { connect } from 'react-redux'
import { openCreateCharacterDialog } from '../actions'

const CreateCharacterButton = (props) => (
  <Tooltip title='Neuen Charakter erstellen' placement='bottom'>
    <IconButton
      color='inherit'
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
