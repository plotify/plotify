import CharacterProfile from './CharacterProfile'
import CharacterProfileMenu from './CharacterProfileMenu'
import CharactersList from './CharactersList'
import CreateCharacterButton from './CreateCharacterButton'
import CreateCharacterDialog from './CreateCharacterDialog'
import IconButton from 'material-ui/IconButton'
import MediaQuery from 'react-responsive'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import SearchIcon from 'material-ui-icons/Search'
import Section from '../../navigation/components/Section'
import ToggleEditModeButton from './ToggleEditModeButton'
import Typography from 'material-ui/Typography'
import UndoRedoButtons from './UndoRedoButtons'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { isCharacterSelected } from '../selectors'
import { withStyles } from 'material-ui/styles'

const CharactersSection = (props) => {
  const { classes, characterSelected } = props

  const listToolbar = ([
    <Typography type='title' color='inherit' className={classes.title} key={1}>
      Charaktere
    </Typography>,
    <CreateCharacterButton key={2} />,
    <IconButton color='contrast' key={3}>
      <SearchIcon />
    </IconButton>
  ])
  const profileToolbar = ([
    <UndoRedoButtons key={1} />,
    <ToggleEditModeButton key={2} />,
    <CharacterProfileMenu key={3} />
  ])
  const toolbar = ([
    <MediaQuery maxWidth={759} key={1}>
      <div className={classNames(classes.listToolbar, classes.listToolbarSingleView)}>
        {listToolbar}
      </div>
    </MediaQuery>,
    <MediaQuery minWidth={760} key={2}>
      <div className={classes.listToolbar}>
        {listToolbar}
      </div>
    </MediaQuery>,
    <MediaQuery minWidth={760} key={3}>
      <div className={classes.profileToolbar}>
        {profileToolbar}
      </div>
    </MediaQuery>
  ])

  let profile = null
  if (characterSelected) {
    profile = (
      <MediaQuery minWidth={760}>
        <CharacterProfile className={classes.profile} />
      </MediaQuery>
    )
  }

  return (
    <Section
      title='Charaktere'
      toolbar={toolbar}>
      <div className={classes.root}>
        <CreateCharacterDialog />
        <MediaQuery maxWidth={759}>
          <Paper className={classNames(classes.listWrapper, classes.listWrapperSingleView)}>
            <CharactersList />
          </Paper>
        </MediaQuery>
        <MediaQuery minWidth={760}>
          <Paper className={classes.listWrapper}>
            <CharactersList />
          </Paper>
        </MediaQuery>
        {profile}
      </div>
    </Section>
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
    justifyContent: 'flex-end'
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
  characterSelected: isCharacterSelected(state)
})

export default connect(mapStateToProps)(StyledCharactersSection)
