import React, { Fragment } from 'react'
import { closeUpdateNotification, openUpdateNotificationUrl } from '../actions'

import Button from 'material-ui/Button'
import CloseIcon from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { isUpdateNotificationOpen } from '../selectors'
import { withStyles } from 'material-ui/styles'

const UpdateNotificationSnackbar = (props) => {
  const { classes, open, onClose, onStartDownload } = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={open}
      message='Ein Update für Plotify ist verfügbar!'
      action={
        <Fragment>
          <Button
            size='small'
            color='inherit'
            onClick={onStartDownload}>
            Jetzt herunterladen
          </Button>
          <IconButton
            color='inherit'
            className={classes.close}
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Fragment>
      }
    />
  )
}

UpdateNotificationSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStartDownload: PropTypes.func.isRequired
}

const styles = (theme) => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

const StyledUpdateNotificationSnackbar = withStyles(styles)(UpdateNotificationSnackbar)

const mapStateToProps = (state) => ({
  open: isUpdateNotificationOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeUpdateNotification()),
  onStartDownload: () => dispatch(openUpdateNotificationUrl())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledUpdateNotificationSnackbar)
