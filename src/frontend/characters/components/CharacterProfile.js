import {
  getProfileGroupIds,
  isCharacterEditModeEnabled,
  isProfileEmpty,
  isProfileFetching
} from '../selectors'

import CharacterProfileGroup from './CharacterProfileGroup'
import { CircularProgress } from 'material-ui/Progress'
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
  name,
  fetching
}) => {
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.wrapper}>
        <ProfileName />
        <div className={
          classNames(
            classes.profileEmptyHint,
            { [classes.hidden]: !fetching }
          )
        }>
          <CircularProgress />
        </div>
        {groups.map(id => (
          <CharacterProfileGroup
            key={id}
            groupId={id}
            className={classes.profileGroup}
            paperClass={classes.profilePaperClass}
          />
        ))}
        {!editMode && profileEmpty && !fetching &&
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
      paddingRight: theme.spacing.unit * 3,
      boxSizing: 'border-box'
    },
    wrapper: {
      flex: '0.5 0.1 400px',
      display: 'flex',
      flexDirection: 'column'
    },
    profileGroup: {
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      padding: theme.spacing.unit * 2
    },
    profilePaperClass: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    profileEmptyHint: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    },
    hidden: {
      display: 'none'
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
  profileEmpty: isProfileEmpty(state),
  fetching: isProfileFetching(state)
})

export default connect(mapStateToProps)(withStyles(styles)(CharacterProfile))
