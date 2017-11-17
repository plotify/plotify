import AppBar from 'material-ui/AppBar'
import MediaQuery from 'react-responsive'
import NavigationDrawerButton from './NavigationDrawerButton'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'

const Section = (props) => (
  <div className={props.classes.wrapper}>
    <AppBar>
      <Toolbar>
        {props.MenuButton && <props.MenuButton className={props.classes.menuButton} />}
        {!props.MenuButton &&
          <NavigationDrawerButton className={props.classes.menuButton} color='contrast' />
        }
        {props.toolbar}
      </Toolbar>
    </AppBar>
    <MediaQuery minWidth={600}>
      <div className={props.classes.content}>
        {props.children}
      </div>
    </MediaQuery>
    <MediaQuery maxWidth={599}>
      <div className={props.classes.contentSmallAppBar}>
        {props.children}
      </div>
    </MediaQuery>
  </div>
)

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  MenuButton: PropTypes.func
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
