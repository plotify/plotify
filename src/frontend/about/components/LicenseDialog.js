import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { getLicenseText, isLicenseDialogOpen } from '../selectors'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { closeLicenseDialog } from '../actions'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const LicenseDialog = (props) => (
  <Dialog
    open={props.open}
    onClose={props.closeLicenseDialog}
    classes={{paperWidthSm: props.classes.paperWidth}}>
    <DialogTitle>Lizenz</DialogTitle>
    <DialogContent>
      <pre className={props.classes.text}>
        {props.text}
      </pre>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.closeLicenseDialog}>Schließen</Button>
    </DialogActions>
  </Dialog>
)

LicenseDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeLicenseDialog: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const styles = (theme) => ({
  text: {
    userSelect: 'text'
  },
  paperWidth: {
    maxWidth: '650px'
  }
})

const StyledLicenseDialog = withStyles(styles)(LicenseDialog)

const mapStateToProps = (state) => ({
  open: isLicenseDialogOpen(state),
  text: getLicenseText(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeLicenseDialog: () => dispatch(closeLicenseDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledLicenseDialog)
