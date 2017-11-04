import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Section from '../../navigation/components/Section'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'material-ui/Paper'
import CharactersList from './CharactersList'
import CharacterProfile from './CharacterProfile'
import CreateCharacterButton from './CreateCharacterButton'
import CreateCharacterDialog from './CreateCharacterDialog'

const CharactersSection = (props) => {
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
        <Paper className={classes.listWrapper}>
          <CharactersList />
          <CreateCharacterButton className={classes.createButton} />
        </Paper>
        <CharacterProfile className={classes.profile} />
        <CreateCharacterDialog />
      </div>
    </Section>
  )
}

CharactersSection.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = (theme) => ({
  root: {
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  listWrapper: {
    height: '100%',
    width: '300px',
    overflowY: 'auto',
    float: 'left'
  },
  createButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: 'calc(300px - 56px - 16px)'
  },
  profile: {
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'transparent'
  }
})

export default withStyles(styles)(CharactersSection)
