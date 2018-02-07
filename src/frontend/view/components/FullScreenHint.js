import { closeFullScreenHint, leaveFullScreen } from '../actions'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { isFullScreenHintOpen } from '../selectors'

const FullScreenHint = (props) =>
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    open={props.open}
    autoHideDuration={10000}
    onClose={props.onCloseFullScreenHint}
    message='Plotify befindet sich jetzt im Vollbildmodus.'
    action={
      <Button size='small' color='inherit' onClick={props.onLeaveFullScreen}>
        Vollbild beenden (F11)
      </Button>
    }
  />

FullScreenHint.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseFullScreenHint: PropTypes.func.isRequired,
  onLeaveFullScreen: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isFullScreenHintOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onCloseFullScreenHint: () => dispatch(closeFullScreenHint()),
  onLeaveFullScreen: () => dispatch(leaveFullScreen())
})

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenHint)
