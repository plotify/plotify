import AppBar from 'material-ui/AppBar'
import MediaQuery from 'react-responsive'
import NavigationDrawerButton from './NavigationDrawerButton'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import { connect } from 'react-redux'
import { getCurrentSection } from '../selectors'
import { withStyles } from 'material-ui/styles'

const Section = (props) => {
  const { id, currentSection } = props
  if (id === currentSection) {
    return createSection(props)
  } else {
    return null
  }
}

const createSection = (props) => {
  const { classes, hideAppBar, children } = props
  const appBar = createAppBar(props)
  const contentClass = hideAppBar ? classes.contentWithoutAppBar : classes.content
  const contentSmallAppBarClass = hideAppBar ? classes.contentWithoutAppBar : classes.contentSmallAppBar
  return (
    <div className={classes.wrapper}>
      {appBar}
      <MediaQuery minWidth={600}>
        <div className={contentClass}>
          {children}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={599}>
        <div className={contentSmallAppBarClass}>
          {children}
        </div>
      </MediaQuery>
    </div>
  )
}

const createAppBar = (props) => {
  const { hideAppBar, toolbar } = props
  if (hideAppBar) {
    return null
  } else {
    const menuButton = createMenuButton(props)
    return (
      <AppBar>
        <Toolbar>
          {menuButton}
          {toolbar}
        </Toolbar>
      </AppBar>
    )
  }
}

const createMenuButton = (props) => {
  const { classes, hideMenuButton, MenuButton } = props
  if (hideMenuButton) {
    return null
  } else {
    return <MenuButton className={classes.menuButton} />
  }
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  currentSection: PropTypes.string.isRequired,
  MenuButton: PropTypes.func.isRequired,
  hideMenuButton: PropTypes.bool.isRequired,
  hideAppBar: PropTypes.bool.isRequired,
  toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
}

Section.defaultProps = {
  MenuButton: NavigationDrawerButton,
  hideMenuButton: false,
  hideAppBar: false
}

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    width: '100%'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 12
  },
  content: {
    overflowY: 'auto',
    paddingTop: '64px',
    height: 'calc(100% - 64px)'
  },
  contentSmallAppBar: {
    overflowY: 'auto',
    paddingTop: '56px',
    height: 'calc(100% - 56px)'
  },
  contentWithoutAppBar: {
    overflowY: 'auto',
    height: '100%'
  }
})

const StyledSection = withStyles(styles)(Section)

const mapStateToProps = (state) => ({
  currentSection: getCurrentSection(state)
})

export default connect(mapStateToProps)(StyledSection)
