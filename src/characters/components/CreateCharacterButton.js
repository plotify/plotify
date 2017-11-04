import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tooltip from 'material-ui/Tooltip'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { openCreateCharacterDialog } from '../actions'

function CreateCharacterButton (props) {
  const { onClick, className } = props
  return (
    <Tooltip title='Neuer Charakter' placement='top'>
      <Button
        fab
        color='primary'
        aria-label='add'
        onClick={onClick}
        className={className}>
        <AddIcon />
      </Button>
    </Tooltip>
  )
}

CreateCharacterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(openCreateCharacterDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacterButton)
