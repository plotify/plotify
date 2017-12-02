import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { getOpeningStoryErrorMessage, isOpeningStoryFailed, isShowOpenStoryDialog } from '../selectors'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { closeOpenStoryDialog } from '../actions'
import { connect } from 'react-redux'

const OpeningStoryDialog = (props) => {
  const { open, failed, closeDialog, errorMessage } = props

  let onRequestClose = () => {}
  let title = 'Öffne Geschichte...'
  let message = null
  let actions = null

  if (failed) {
    onRequestClose = closeDialog
    title = 'Die Geschichte konnte nicht geöffnet werden.'
    message = (
      <DialogContent>
        <Typography>{errorMessage}</Typography>
      </DialogContent>
    )
    actions = (
      <DialogActions>
        <Button onClick={closeDialog}>Schließen</Button>
      </DialogActions>
    )
  }

  return (
    <Dialog open={open} onRequestClose={onRequestClose}>
      <DialogTitle>{title}</DialogTitle>
      {message}
      {actions}
    </Dialog>
  )
}

OpeningStoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  closeDialog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isShowOpenStoryDialog(state),
  failed: isOpeningStoryFailed(state),
  errorMessage: getOpeningStoryErrorMessage(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch(closeOpenStoryDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(OpeningStoryDialog)
