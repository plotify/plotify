import {
    getProfileGroupIds,
    isCharacterEditModeEnabled,
    isProfileEmpty
} from '../selectors'

import CharacterProfileGroup from './CharacterProfileGroup'
import ProfileEmptyHint from './ProfileEmptyHint'
import ProfileName from './CharacterProfileName'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const CharacterProfile = ({
  classes,
  className,
  profile,
  editMode,
  profileEmpty,
  groups,
  name
}) => {
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.wrapper}>
        <ProfileName />
        {groups.map(id => (
          <CharacterProfileGroup
            key={id}
            groupId={id}
            className={classes.profileGroup}
            paperClass={classes.profilePaperClass}
          />
        ))}
        {!editMode && profileEmpty &&
          <ProfileEmptyHint
            className={classes.profileEmptyHint}
          />
        }
      </div>
    </div>
  )
}

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      boxSizing: 'border-box'
    },
    wrapper: {
      flex: '0.5 0.1 400px',
      display: 'flex',
      flexDirection: 'column'
    },
    profileGroup: {
      padding: theme.spacing.unit * 2
    },
    profilePaperClass: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '850px' // Maximale Breite zu Testzwecken in der Demo.
    },
    profileEmptyHint: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }
  }
}

CharacterProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  groups: getProfileGroupIds(state),
  editMode: isCharacterEditModeEnabled(state),
  profileEmpty: isProfileEmpty(state)
})

export default connect(mapStateToProps)(withStyles(styles)(CharacterProfile))
