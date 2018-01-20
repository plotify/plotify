import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getNotPinnedFiles, getPinnedFiles } from '../selectors'

import ErrorSnackbar from './ErrorSnackbar'
import FolderNotFoundDialog from './FolderNotFoundDialog'
import NoRecentFiles from './NoRecentFiles'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFilesList from './RecentFilesList'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const RecentFiles = (props) => {
  const { classes, pinnedFiles, notPinnedFiles, listClassName } = props
  const transitionClassNames = {
    enter: classes.enter,
    enterActive: classes.enterActive,
    exit: classes.exit,
    exitActive: classes.exitActive
  }
  return [
    <TransitionGroup key={0}>
      {[
        transition(0, noRecentFiles(props), transitionClassNames),
        transition(1, list(pinnedFiles, listClassName), transitionClassNames),
        transition(2, list(notPinnedFiles, listClassName), transitionClassNames)
      ]}
    </TransitionGroup>,
    <FolderNotFoundDialog key={1} />,
    <ErrorSnackbar key={2} />
  ]
}

const transition = (key, element, transitionClassNames) => {
  if (element) {
    return (
      <CSSTransition
        key={key}
        classNames={transitionClassNames}
        timeout={150}>
        {element}
      </CSSTransition>
    )
  }
}

const noRecentFiles = (props) => {
  const { pinnedFiles, notPinnedFiles, listClassName } = props
  if (pinnedFiles.length + notPinnedFiles.length === 0) {
    return (
      <Paper className={listClassName}>
        <NoRecentFiles />
      </Paper>
    )
  }
}

const list = (files, className) => {
  if (files.length > 0) {
    return (
      <Paper className={className}>
        <RecentFilesList files={files} />
      </Paper>
    )
  }
}

RecentFiles.propTypes = {
  classes: PropTypes.object.isRequired,
  pinnedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  notPinnedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  listClassName: PropTypes.string
}

const styles = theme => ({
  enter: {
    height: 0,
    overflow: 'hidden'
  },
  enterActive: {
    height: '84px',
    transition: theme.transitions.create('height', { duration: theme.transitions.duration.shortest }),
    overflow: 'hidden'
  },
  exit: {
    height: '84px',
    overflow: 'hidden'
  },
  exitActive: {
    height: 0,
    transition: theme.transitions.create('height', { duration: theme.transitions.duration.shortest }),
    overflow: 'hidden'
  }
})

const StyledRecentFiles = withStyles(styles)(RecentFiles)

const mapStateToProps = (state) => ({
  pinnedFiles: getPinnedFiles(state),
  notPinnedFiles: getNotPinnedFiles(state)
})

export default connect(mapStateToProps)(StyledRecentFiles)
