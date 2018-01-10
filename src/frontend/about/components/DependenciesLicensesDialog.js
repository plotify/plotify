import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { getDependenciesLicensesText, isDependenciesLicensesOpen } from '../selectors'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { closeDependenciesLicensesDialog } from '../actions'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const DependenciesLicensesDialog = (props) => (
  <Dialog
    open={props.open}
    onClose={props.closeDependenciesLicensesDialog}>
    <DialogTitle>Weitere Lizenzen</DialogTitle>
    <DialogContent>
      <Typography component={'pre'} className={props.classes.text}>
        {props.text}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.closeDependenciesLicensesDialog}>Schließen</Button>
    </DialogActions>
  </Dialog>
)

DependenciesLicensesDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  closeDependenciesLicensesDialog: PropTypes.func.isRequired
}

const styles = (theme) => ({
  text: {
    userSelect: 'text',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }
})

const StyledLicenseDialog = withStyles(styles)(DependenciesLicensesDialog)

const mapStateToProps = (state) => ({
  open: isDependenciesLicensesOpen(state),
  text: getDependenciesLicensesText(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeDependenciesLicensesDialog: () => dispatch(closeDependenciesLicensesDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledLicenseDialog)
