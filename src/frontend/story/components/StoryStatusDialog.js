import Dialog, { DialogTitle } from 'material-ui/Dialog'
import { isClosingStory, isCreatingStory, isOpeningStory } from '../selectors'

import { CircularProgress } from 'material-ui/Progress'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const StoryStatusDialog = (props) => (
  <Dialog open={isOpen(props)}>
    <DialogTitle className={props.classes.title}>
      <CircularProgress className={props.classes.progress} />
      <span>{getMessage(props)}</span>
    </DialogTitle>
  </Dialog>
)

const isOpen = (props) => props.closing || props.creating || props.opening

// Hinweis: Wenn eine gerade neu erstellte Geschichte geöffnet wird,
// wird weiterhin der Schriftzug 'Erstelle Geschichte' angezeigt werden.
const getMessage = (props) => {
  if (props.closing) {
    return 'Schließe Geschichte...'
  } else if (props.creating) {
    return 'Erstelle Geschichte...'
  } else if (props.opening) {
    return 'Öffne Geschichte...'
  }
}

StoryStatusDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closing: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  opening: PropTypes.bool.isRequired
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

const mapStateToProps = (state) => ({
  closing: isClosingStory(state),
  creating: isCreatingStory(state),
  opening: isOpeningStory(state)
})

export default connect(mapStateToProps)(withStyles(styles)(StoryStatusDialog))
