import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Section from '../../navigation/components/Section'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import Paper from 'material-ui/Paper'
import CharactersList from './CharactersList'

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
      </div>
    </Section>
  )
}

/*
        <div className={classes.test}>
          <Paper className={classes.testItem}></Paper>
        </div>
*/

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
  test: {
    height: '100%',
    overflowY: 'auto',
    marginLeft: '300px'
  },
  testItem: {
    height: '1500px',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(CharactersSection)
