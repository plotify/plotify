import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Section from '../../navigation/components/Section'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'material-ui/Paper'
import CharactersList from './CharactersList'
import CharacterProfile from './CharacterProfile'

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
      <div className={classes.root}>
        <Paper className={classes.charactersListWrapper}>
          <CharactersList className={classes.charactersList} />
        </Paper>
        <CharacterProfile className={classes.characterProfile} />
      </div>
    </Section>
  )
}

CharactersSection.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  charactersListWrapper: {
    height: '100%',
    width: '300px',
    overflowY: 'auto',
    float: 'left'
  },
  characterProfile: {
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'transparent'
  }
})

export default withStyles(styles)(CharactersSection)
