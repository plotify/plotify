import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Section from './navigation/Section'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import CharactersList from './characters/CharactersList'
import NavigationDrawer from './navigation/NavigationDrawer'
import AboutDialog from './about/AboutDialog'
import uuid from 'uuid/v4'

const characters = [
  { id: uuid(), name: 'Max Mustermann', description: 'Mustermann ist ein häufig verwendeter Familienname fiktiver Personen in Deutschland. Erika Mustermann und Max Mustermann stehen als Platzhalternamen für eine beliebige (reale) Frau und einen beliebigen (realen) Mann.' },
  { id: uuid(), name: 'Erika Musterfrau', description: 'Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können.' },
  { id: uuid(), name: 'Sherlock Holmes', description: 'Sherlock Holmes ist eine vom britischen Schriftsteller Sir Arthur Conan Doyle geschaffene Kunstfigur, die in seinen im späten 19. und frühen 20. Jahrhundert spielenden Romanen als Detektiv tätig ist.' },
  { id: uuid(), name: 'Sebastian Schmidt', description: 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.' },
  { id: uuid(), name: 'Rebecca Rademacher', description: 'Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans.' },
  { id: uuid(), name: 'Max Moritz Jasper Tim Müller', description: 'Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. icht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben.' }
]

function App (props) {
  const { classes } = props
  return (
    <div className={classes.wrapper}>
      <NavigationDrawer />
      <AboutDialog />
      <Section
        title='Charaktere'
        actions={
          <IconButton color='contrast'>
            <SearchIcon />
          </IconButton>
        }>
        <CharactersList characters={characters} />
      </Section>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
})

export default withStyles(styles)(App)
