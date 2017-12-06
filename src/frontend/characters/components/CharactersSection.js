import { getSelectedCharacterName, isCharacterSelected } from '../selectors'

import BackIcon from 'material-ui-icons/ArrowBack'
import { CHARACTERS_SECTION } from '../constants'
import CharacterProfile from './CharacterProfile'
import CharactersList from './CharactersList'
import CreateCharacterButton from './CreateCharacterButton'
import CreateCharacterDialog from './CreateCharacterDialog'
import IconButton from 'material-ui/IconButton'
import MediaQuery from 'react-responsive'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import Section from '../../navigation/components/Section'
import ToggleEditModeButton from './ToggleEditModeButton'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { deselectCharacter } from '../actions'
import { withStyles } from 'material-ui/styles'

// import SearchIcon from 'material-ui-icons/Search'
// import CharacterProfileMenu from './CharacterProfileMenu'
// import UndoRedoButtons from './UndoRedoButtons'

const CharactersSection = (props) => {
  const { classes, characterSelected, selectedCharacterName } = props

  const listToolbar = ([
    <Typography type='title' color='inherit' className={classes.title} key={1}>
      Charaktere
    </Typography>,
    <CreateCharacterButton key={2} />
    // <IconButton color='contrast' key={3}>
    //   <SearchIcon />
    // </IconButton>
  ])

  const profileToolbar = ([
    <MediaQuery maxWidth={759} key={0}>
      <Typography type='title' color='inherit' className={classes.title}>
        {characterSelected && selectedCharacterName}
      </Typography>
    </MediaQuery>,
    // <UndoRedoButtons key={1} />,
    <ToggleEditModeButton key={2} />
    // <CharacterProfileMenu key={3} />
  ])
  const toolbar = ([
    <MediaQuery maxWidth={759} key={1}>
      {!characterSelected &&
      <div className={classNames(classes.listToolbar, classes.listToolbarSingleView)}>
        {listToolbar}
      </div>}
    </MediaQuery>,
    <MediaQuery minWidth={760} key={2}>
      <div className={classes.listToolbar}>
        {listToolbar}
      </div>
    </MediaQuery>,
    <div className={classes.profileToolbar} key={3}>
      {profileToolbar}
    </div>
  ])

  let profile = null
  let BackButton
  if (characterSelected) {
    profile = (
      <CharacterProfile className={classes.profile} />
    )
    BackButton = (backProps) => (
      <IconButton
        color='contrast'
        onClick={props.deselectCharacter}
        aria-label='Back'
        {...backProps}
      >
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

  return [
    <MediaQuery minWidth={760} key={0}>
      <Section
        id={CHARACTERS_SECTION}
        title='Charaktere'
        toolbar={toolbar}>
        {content}
      </Section>
    </MediaQuery>,
    <MediaQuery maxWidth={759} key={1}>
      <Section
        id={CHARACTERS_SECTION}
        title='Charaktere'
        toolbar={toolbar}
        MenuButton={BackButton}>
        {content}
      </Section>
    </MediaQuery>
  ]
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
