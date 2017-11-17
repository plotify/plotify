import AboutDialog from './about/components/AboutDialog'
import CharactersSection from './characters/components/CharactersSection'
import NavigationDrawer from './navigation/components/NavigationDrawer'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'

const App = (props) => (
  <div className={props.classes.wrapper}>
    <NavigationDrawer />
    <AboutDialog />
    <CharactersSection />
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
})

export default withStyles(styles)(App)
