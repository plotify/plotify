import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Section from '../navigation/Section'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'material-ui/Paper'
import CharactersList from './CharactersList'
import uuid from 'uuid/v4'

const characters = [
  { id: uuid(), name: 'Sherlock Holmes' },
  { id: uuid(), name: 'Dr. Watson' },
  { id: uuid(), name: 'Mary Morstan' },
  { id: uuid(), name: 'Professor Moriarty' },
  { id: uuid(), name: 'Mycroft Holmes' },
  { id: uuid(), name: 'Irene Adler' },
  { id: uuid(), name: 'Inspector Lestrade' }
]

function CharactersSection (props) {
  const { classes } = props
  return (
    <Section
      title='Charaktere'
      actions={
        <IconButton color='contrast'>
          <SearchIcon />
        </IconButton>
      }>
      <Paper className={classes.charactersListWrapper}>
        <CharactersList className={classes.charactersList} characters={characters} />
      </Paper>
    </Section>
  )
}

CharactersSection.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  charactersListWrapper: {
    height: '100%',
    width: '350px',
    overflowY: 'auto'
  }
})

export default withStyles(styles)(CharactersSection)
