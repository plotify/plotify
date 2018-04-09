import React, { Fragment } from 'react'
import { getSelectedCharacterName, isCharacterSelected } from '../selectors'

import BackIcon from '@material-ui/icons/ArrowBack'
import { CHARACTERS_SECTION } from '../constants'
import CharacterProfile from './CharacterProfile'
import CharactersList from './CharactersList'
import CreateCharacterButton from './CreateCharacterButton'
import CreateCharacterDialog from './CreateCharacterDialog'
import IconButton from 'material-ui/IconButton'
import MediaQuery from 'react-responsive'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import Section from '../../navigation/components/Section'
import ToggleEditModeButton from './ToggleEditModeButton'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { deselectCharacter } from '../actions'
import { withStyles } from 'material-ui/styles'

const CharactersSection = (props) => {
  const { classes, characterSelected, selectedCharacterName } = props

  const listToolbar = (
    <Fragment>
      <Typography variant='title' color='inherit' className={classes.title}>
        Charaktere
      </Typography>
      <CreateCharacterButton />
    </Fragment>
  )

  const profileToolbar = characterSelected ? (
    <Fragment>
      <MediaQuery maxWidth={759}>
        <Typography variant='title' color='inherit' className={classes.title}>
          {characterSelected && selectedCharacterName}
        </Typography>
      </MediaQuery>
      <ToggleEditModeButton />
    </Fragment>
  ) : null

  const toolbar = (
    <Fragment>
      <MediaQuery maxWidth={759}>
        {!characterSelected &&
        <div className={classNames(classes.listToolbar, classes.listToolbarSingleView)}>
          {listToolbar}
        </div>}
      </MediaQuery>
      <MediaQuery minWidth={760}>
        <div className={classes.listToolbar}>
          {listToolbar}
        </div>
      </MediaQuery>
      <div className={classes.profileToolbar}>
        {profileToolbar}
      </div>
    </Fragment>
  )

  let profile = null
  let BackButton
  if (characterSelected) {
    profile = (
      <CharacterProfile className={classes.profile} />
    )
    BackButton = (backProps) => (
      <IconButton
        color='inherit'
        onClick={props.deselectCharacter}
        aria-label='Back'
        {...backProps}>
        <BackIcon />
      </IconButton>
    )
  }

  const content = <div className={classes.root}>
    <CreateCharacterDialog />
    {!characterSelected &&
      <MediaQuery maxWidth={759}>
        <Paper className={classNames(classes.listWrapper, classes.listWrapperSingleView)}>
          <CharactersList />
        </Paper>
      </MediaQuery>
    }
    <MediaQuery minWidth={760}>
      <Paper className={classes.listWrapper}>
        <CharactersList />
      </Paper>
    </MediaQuery>
    {profile}
  </div>

  return (
    <Fragment>
      <MediaQuery minWidth={760}>
        <Section
          id={CHARACTERS_SECTION}
          title='Charaktere'
          toolbar={toolbar}>
          {content}
        </Section>
      </MediaQuery>
      <MediaQuery maxWidth={759}>
        <Section
          id={CHARACTERS_SECTION}
          title='Charaktere'
          toolbar={toolbar}
          MenuButton={BackButton}>
          {content}
        </Section>
      </MediaQuery>
    </Fragment>
  )
}

CharactersSection.propTypes = {
  classes: PropTypes.object.isRequired,
  characterSelected: PropTypes.bool.isRequired
}

const styles = (theme) => ({
  listToolbar: {
    display: 'flex',
    alignItems: 'center',
    width: 300 - 72 - (theme.spacing.unit / 2)
  },
  listToolbarSingleView: {
    width: '100%'
  },
  profileToolbar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    flex: 1
  },
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
  profile: {
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'transparent'
  }
})

const StyledCharactersSection = withStyles(styles)(CharactersSection)

const mapStateToProps = (state) => ({
  characterSelected: isCharacterSelected(state),
  selectedCharacterName: getSelectedCharacterName(state)
})

const mapDispatchToProps = (dispatch) => ({
  deselectCharacter: () => dispatch(deselectCharacter())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledCharactersSection)
