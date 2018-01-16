import { CSSTransition, TransitionGroup } from 'react-transition-group'

import List from 'material-ui/List'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFileListItem from './RecentFileListItem'
import { withStyles } from 'material-ui/styles'

const RecentFilesList = (props) => {
  const { classes, files } = props
  const transitionClassNames = {
    enter: classes.enter,
    enterActive: classes.enterActive,
    exit: classes.exit,
    exitActive: classes.exitActive
  }
  return (
    <TransitionGroup component={List}>
      {files.map((file, index) => (
        <CSSTransition
          key={file.path}
          classNames={transitionClassNames}
          timeout={1000}>
          <RecentFileListItem
            path={file.path}
            pinned={file.pinned}
            removing={file.removing} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

RecentFilesList.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    pinned: PropTypes.bool.isRequired,
    removing: PropTypes.bool.isRequired
  })).isRequired
}

const styles = theme => ({
  enter: {
    height: 0,
    overflow: 'hidden'
  },
  enterActive: {
    height: '68px',
    transition: theme.transitions.create('height', { duration: theme.transitions.duration.shortest }),
    overflow: 'hidden'
  },
  exit: {
    height: '68px',
    overflow: 'hidden'
  },
  exitActive: {
    height: 0,
    transition: theme.transitions.create('height', { duration: theme.transitions.duration.shortest }),
    overflow: 'hidden'
  }
})

export default withStyles(styles)(RecentFilesList)
