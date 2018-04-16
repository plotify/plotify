import * as s from '../selectors'

import Dialog, { DialogTitle } from 'material-ui/Dialog'

import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const OpeningStoryDialog = (props) => (
  <Dialog open={props.open}>
    <DialogTitle className={props.classes.title}>
      <CircularProgress className={props.classes.progress} />
      <span>Öffne Geschichte...</span>
    </DialogTitle>
  </Dialog>
)

OpeningStoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
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
  }
})

const StyledOpeningStoryDialog = withStyles(styles)(OpeningStoryDialog)

const mapStateToProps = (state) => ({
  open: s.isShowOpenStoryDialog(state)
})

export default connect(mapStateToProps)(StyledOpeningStoryDialog)
