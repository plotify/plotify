import {
  getSelectedCharacterId,
  getSelectedCharacterName,
  isCharacterEditModeEnabled
} from '../selectors'

import AutosavingTextField from '../../shared/AutosavingTextField'
import React from 'react'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateCharacterName } from '../actions'
import { withStyles } from 'material-ui/styles'

const CharacterProfileName = ({characterId, name, editMode, update, classes}) => (
  <div className={classes.root}>
    {!editMode &&
      <Typography
        className={
          classNames(
            classes.size,
            classes.name,
            {
              [classes.emptyName]: name.length === 0
            }
          )
        }>
        {name || 'Kein Name'}
      </Typography>
    }
    {editMode &&
      <AutosavingTextField
        defaultValue={name}
        disabled={!editMode}
        onSave={(value) => update(characterId, value)}
        InputProps={{
          classes: {
            input: classes.size
          }
        }}
      />
    }
  </div>
)
const styles = (theme) => ({
  root: {
    alignSelf: 'center',
    padding: theme.spacing.unit * 3,
    marginRight: -(theme.spacing.unit * 3)
  },
  size: {
    fontSize: 30,
    textAlign: 'center'
  },
  name: {
    borderBottom: '1px solid lightgray',
    minWidth: 320,
    userSelect: 'auto',
    '&:hover': {
      cursor: 'text'
    }
  },
  emptyName: {
    fontStyle: 'italic',
    opacity: 0.5,
    userSelect: 'none',
    '&:hover': {
      cursor: 'default'
    }
  }
})

const mapStateToProps = (state) => ({
  name: getSelectedCharacterName(state),
  characterId: getSelectedCharacterId(state),
  editMode: isCharacterEditModeEnabled(state)
})

const mapDispatchToProps = (dispatch) => ({
  update: (id, name) => dispatch(updateCharacterName(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CharacterProfileName))
