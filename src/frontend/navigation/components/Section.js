import AppBar from 'material-ui/AppBar'
import MediaQuery from 'react-responsive'
import NavigationDrawerButton from './NavigationDrawerButton'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'

const Section = (props) => {
  const { classes, toolbar, children } = props
  const menuButton = createMenuButton(props)
  return (
    <div className={classes.wrapper}>
      <AppBar>
        <Toolbar>
          {menuButton}
          {toolbar}
        </Toolbar>
      </AppBar>
      <MediaQuery minWidth={600}>
        <div className={classes.content}>
          {children}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={599}>
        <div className={classes.contentSmallAppBar}>
          {children}
        </div>
      </MediaQuery>
    </div>
  )
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
  MenuButton: PropTypes.func.isRequired,
  hideMenuButton: PropTypes.bool.isRequired,
  toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
}

Section.defaultProps = {
  MenuButton: NavigationDrawerButton,
  hideMenuButton: false
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
  }
})

export default withStyles(styles)(Section)
