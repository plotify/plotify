import Dialog, { DialogTitle } from 'material-ui/Dialog'

import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { isClosingStory } from '../selectors'
import { withStyles } from 'material-ui/styles'

const ClosingStoryDialog = (props) => (
  <Dialog open={props.open}>
    <DialogTitle className={props.classes.title}>
      <CircularProgress className={props.classes.progress} />
      <span>Schließe Geschichte...</span>
    </DialogTitle>
  </Dialog>
)

ClosingStoryDialog.propTypes = {
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

const StyledClosingStoryDialog = withStyles(styles)(ClosingStoryDialog)

const mapStateToProps = (state) => ({
  open: isClosingStory(state)
})

export default connect(mapStateToProps)(StyledClosingStoryDialog)
