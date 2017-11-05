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
import MediaQuery from 'react-responsive'
import classNames from 'classnames'

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
        <CreateCharacterDialog />
        <MediaQuery maxWidth={759}>
          <Paper className={classNames(classes.listWrapper, classes.listWrapperSingleView)}>
            <CharactersList />
            <CreateCharacterButton className={classNames(classes.createButton, classes.createButtonSingleView)} />
          </Paper>
        </MediaQuery>
        <MediaQuery minWidth={760}>
          <Paper className={classes.listWrapper}>
            <CharactersList />
            <CreateCharacterButton className={classes.createButton} />
          </Paper>
        </MediaQuery>
        <MediaQuery minWidth={760}>
          <CharacterProfile className={classes.profile} />
        </MediaQuery>
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
  listWrapperSingleView: {
    width: '100%',
    float: 'none'
  },
  createButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: 'calc(300px - 56px - 16px)'
  },
  createButtonSingleView: {
    left: 'auto',
    right: '16px'
  },
  profile: {
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'transparent'
  }
})

export default withStyles(styles)(CharactersSection)
