import AboutDialog from './about/components/AboutDialog'
import CharactersSection from './characters/components/CharactersSection'
import CreatingStoryDialog from './story/components/CreatingStoryDialog'
import NavigationDrawer from './navigation/components/NavigationDrawer'
import OpeningStoryDialog from './story/components/OpeningStoryDialog'
import PropTypes from 'prop-types'
import React from 'react'
import WelcomeSection from './welcome/components/WelcomeSection'
import { basename } from 'path'
import { connect } from 'react-redux'
import { getStoryPath } from './story/selectors'
import { withStyles } from 'material-ui/styles'

const productName = require('../package.json').productName

class App extends React.Component {
  componentWillUpdate (nextProps) {
    if (nextProps.path) {
      document.title = basename(nextProps.path) + ' - ' + productName
    } else {
      document.title = productName
    }
  }

  render () {
    return (
      <div className={this.props.classes.wrapper}>
        <NavigationDrawer />
        <AboutDialog />
        <OpeningStoryDialog />
        <CreatingStoryDialog />
        <WelcomeSection />
        <CharactersSection />
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string
}

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
})

const StyledApp = withStyles(styles)(App)

const mapStateToProps = (state) => ({
  path: getStoryPath(state)
})

export default connect(mapStateToProps)(StyledApp)
