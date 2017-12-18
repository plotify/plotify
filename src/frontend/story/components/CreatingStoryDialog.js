import * as s from '../selectors'

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { closeCreateStoryDialog } from '../actions'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const CreatingStoryDialog = (props) => {
  const { open, classes, failed, errorMessage, closeDialog } = props

  let onClose = () => {}
  let title = 'Erstelle Geschichte...'
  let message = null
  let actions = null

  if (failed) {
    onClose = closeDialog
    title = 'Die Geschichte konnte nicht erstellt werden.'
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.title}>
        <CircularProgress className={failed ? classes.hide : classes.progress} />
        <span>{title}</span>
      </DialogTitle>
      {message}
      {actions}
    </Dialog>
  )
}

CreatingStoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  closeDialog: PropTypes.func.isRequired
}

const styles = (theme) => ({
  title: {
    '& h2': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  progress: {
    display: 'block',
    marginRight: theme.spacing.unit * 2
  },
  hide: {
    display: 'none'
  }
})

const StyledCreatingStoryDialog = withStyles(styles)(CreatingStoryDialog)

const mapStateToProps = (state) => ({
  open: s.isShowCreateStoryDialog(state),
  failed: s.isCreatingStoryFailed(state),
  errorMessage: s.getCreatingStoryErrorMessage(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch(closeCreateStoryDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledCreatingStoryDialog)
