import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { closeLicenseDialog, openDependenciesLicensesDialog } from '../actions'
import { getLicenseText, isLicenseDialogOpen } from '../selectors'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const LicenseDialog = (props) => (
  <Dialog
    open={props.open}
    onClose={props.closeLicenseDialog}>
    <DialogTitle>Lizenz</DialogTitle>
    <DialogContent>
      <Typography component={'pre'} className={props.classes.text}>
        {props.text}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.openDependenciesLicensesDialog}>Weitere Lizenzen</Button>
      <Button onClick={props.closeLicenseDialog}>Schließen</Button>
    </DialogActions>
  </Dialog>
)

LicenseDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeLicenseDialog: PropTypes.func.isRequired,
  openDependenciesLicensesDialog: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const styles = (theme) => ({
  text: {
    userSelect: 'text',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }
})

const StyledLicenseDialog = withStyles(styles)(LicenseDialog)

const mapStateToProps = (state) => ({
  open: isLicenseDialogOpen(state),
  text: getLicenseText(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeLicenseDialog: () => dispatch(closeLicenseDialog()),
  openDependenciesLicensesDialog: () => dispatch(openDependenciesLicensesDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledLicenseDialog)
